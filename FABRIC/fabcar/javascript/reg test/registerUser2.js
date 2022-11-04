/*
 * SPDX-License-Identifier: Apache-2.0
 */

//RUN INSTRUCTION:
//TERMINAL COMMAND: node registerUser.js 
'use strict';


//Outside main function because async main cannot run sync methods
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve('connection-org1.json');
const pars = require('./parseArgs.js');


async function main() {
    try {
       let userPayload = pars.parseArgs(process.argv,false);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), userPayload.common.wallet);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(userPayload.registerUser.userIdentity);
        if (userExists) {
            console.log('An identity for the user "user1" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists(userPayload.adminEnroll.adminIdentity);
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userPayload.adminEnroll.adminIdentity, discovery: { enabled: false, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: userPayload.registerUser.affiliation, enrollmentID: userPayload.registerUser.userIdentity, role: userPayload.registerUser.role }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: userPayload.registerUser.userIdentity, enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity(userPayload.common.organisationMSP, enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(userPayload.registerUser.userIdentity, userIdentity);
        console.log('Successfully registered and enrolled admin user "user1" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "user1": ${error}`);
        process.exit(1);
    }
}

main();