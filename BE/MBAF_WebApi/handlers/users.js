
'use strict';
const config = require("../util/config");
const { uuid } = require("uuidv4");
const FabricCAServices = require('fabric-ca-client');
const { Wallets,Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../util/validators");
const { Console } = require("console");

// Get any user's details
exports.getUserDetails = (req, res) => {


  let userData = {};
  userData = {
    Id: 123,
    Name: "shanmuk"
  };
  return res.json(userData);
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then((data) => {

      data.forEach((doc) => {
        userData.screams.push({
          Id: 123,
          Name: "shanmuk"
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
exports.getAssets = async (req, res) => {
 
  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname,'..', 'ConnectionStrings', 'FirstNetworkNasaGatewayConnection.json');
    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // Create a new CA client for interacting with the CA.
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'Wallet'); // Change it from Database
    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);
    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get('NASA Admin');

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    
    await gateway.connect(ccp, { wallet, identity: 'NASA Admin', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('common');

    // Get the contract from the network.
    const contract = network.getContract('Sample');

    // Evaluate the specified transaction.
  
    const result = await contract.evaluateTransaction('ReadBcAsset','sample');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(JSON.stringify(result.toString()));


  } catch (error) {
    console.error( error);
    console.error(`Failed to enroll admin user "admin": ${error}`);
    process.exit(1);
  }
  console.log()
  

}