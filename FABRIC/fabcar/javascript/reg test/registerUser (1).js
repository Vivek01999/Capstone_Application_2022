/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const pars = require('./parseArgs.js');

async function main() {
    try {
        // load the network configuration
        let userPayload = pars.parseArgs(process.argv,false);
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[userPayload.adminEnroll.CAauth].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), userPayload.common.wallet);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        //console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(userPayload.registerUser.userIdentity);
        if (userIdentity) {
            console.log(`An identity for the user '${userPayload.registerUser.userIdentity}' already exists in the wallet`);
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get(userPayload.adminEnroll.adminIdentity);
        if (!adminIdentity) {
            console.log(`An identity for the admin user ${userPayload.adminEnroll.adminIdentity} does not exist in the wallet`);
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, userPayload.adminEnroll.adminIdentity);

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: userPayload.registerUser.affiliation,
            enrollmentID: userPayload.registerUser.userIdentity,
            role: userPayload.registerUser.role
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: userPayload.registerUser.userIdentity,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: userPayload.common.organisationMSP,
            type: 'X.509',
        };
        await wallet.put(userPayload.registerUser.userIdentity, x509Identity);
        console.log(`Successfully registered and enrolled admin user '${userPayload.registerUser.userIdentity}' and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to register user "appUser": ${error}`);
        process.exit(1);
    }
}

main();
