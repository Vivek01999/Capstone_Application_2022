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
const { json } = require('body-parser');



async function main() {
    var resPayload = parseArgs.parseArgs(process.argv, false);
    try {
        // load the network configuration
        
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[resPayload.caAuth];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), resPayload.wallet);
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const adminIdentity = await wallet.get(resPayload.adminIdentity);
        if (!adminIdentity) {
            console.log(`An identity for the admin user ${resPayload.adminIdentity} does not exist in the wallet`);
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        try{
            const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
            const adminUser = await provider.getUserContext(adminIdentity, resPayload.adminIdentity);
            const identityService = ca.newIdentityService();
    
            const userList = await identityService.getAll(adminUser);
    
            console.log(`${JSON.stringify(userList)}`);
        }catch(error){
            throw new Error(error);
        }
        

    } catch (error) {
        console.error(`Failed to get list of users from the wallet: ${error}`);
        process.exit(1);
    }
}

main();