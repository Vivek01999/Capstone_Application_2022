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


        const userIdentity = await wallet.get(resPayload.userIdentity);
        if (!userIdentity) {
            console.log(`An identity for the user ${resPayload.userIdentity} not exists in the wallet`);
            return;
        }
        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get(resPayload.adminIdentity);
        if (!adminIdentity) {
            console.log(`An identity for the admin user ${resPayload.adminIdentity} does not exist in the wallet`);
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, resPayload.adminIdentity);

        const delObject = await ca.revoke({
            enrollmentID: resPayload.userIdentity,
            reason: resPayload.reason,
            gencrl: true
        }, adminUser);

        if (delObject.success == true) {
            const identityService = ca.newIdentityService();
            identityService.delete(resPayload.userIdentity, adminUser, true).then(async function (response) {

                await wallet.remove(resPayload.userIdentity);
                console.log(`Successfully deleted fabric user ${resPayload.userIdentity}`);
            });
        }else{
            throw new Error(`Unable to revoke the fabric user ${resPayload.userIdentity}`);
        }


    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

main();