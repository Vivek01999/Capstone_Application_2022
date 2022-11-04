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
    var resPayload = parseArgs.parseArgs(process.argv, false);
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

        const userIdentity = await wallet.get(resPayload.userIdentity);
        if (!userIdentity) {
            console.log(`An identity for the user ${resPayload.userIdentity} does not exists in the wallet`);
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
        try {
            const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
            const adminUser = await provider.getUserContext(adminIdentity, resPayload.adminIdentity);
            const identityService = ca.newIdentityService();

            let updateObj = {
                type: resPayload.role,
                affiliation: resPayload.affiliation
            }
            const response = await identityService.update(resPayload.userIdentity, updateObj, adminUser);
            console.log(`${JSON.stringify(response)}`);
        } catch (err) {
            throw new Error(err);
        }

        console.log(`Successfully updated details of fabric user ${resPayload.userIdentity}`);

    } catch (error) {
        console.error(`Failed to register user ${resPayload.userIdentity}: ${error}`);
        process.exit(1);
    }
}

main();