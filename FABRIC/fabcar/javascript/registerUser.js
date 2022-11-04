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
const parseArgs = require('./parseArgs');
const { ALL } = require('dns');



async function main() {
    // console.log("I'm here!!!!!");
    var resPayload = parseArgs.parseArgs(process.argv, false);
    // console.log(resPayload);
    try {
        // load the network configuration
        
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[resPayload.caAuth].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), resPayload.wallet);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        //console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        
        // await wallet.remove('vivek'); //Deleting Fab User
        // const tres = await wallet.list() //List of fab users
        // console.log(tres);

        const userIdentity = await wallet.get(resPayload.userIdentity);
        if (userIdentity) {
            console.log(`An identity for the user ${resPayload.userIdentity} already exists in the wallet`);
            return;
        }
        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get(resPayload.adminIdentity);
        if (!adminIdentity) {
            console.log(`An identity for the admin user ${resPayload.adminIdentity} does not exist in the wallet`);
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, resPayload.adminIdentity);

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: resPayload.affiliation,
            enrollmentID: resPayload.userIdentity,
            role: resPayload.role
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: resPayload.userIdentity,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: resPayload.orgMspID,
            type: 'X.509',
        };

        await wallet.put(resPayload.userIdentity, x509Identity);

        console.log(`Successfully registered and enrolled admin user ${resPayload.userIdentity} and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to register user ${resPayload.userIdentity}: ${error}`);
        process.exit(1);
    }
}

main();