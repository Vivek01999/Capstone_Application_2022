//newly pushing into git
'use strict';
const config = require("../util/config");
const { uuid } = require("uuidv4");
const FabricCAServices = require('fabric-ca-client');
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails, 
} = require("../util/validators");


const ccpPath = path.resolve(__dirname, '..', 'ConnectionStrings', 'Org1LocalOrg1GatewayConnection.json');
const identityName = 'Org1 Admin';
const channelName = 'mychannel';
const smartContractName = 'Test'; 

exports.getMBSEBaseTemplate = async (req, res) => {

  try {
    // load the network configuration
    console.log(ccpPath)
    
    const ReqAssetId = req.body.AssetId;
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);

    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);

    // const createKey = createMBSEBaseTemplate().assetId;

    // For create method use JSON.Stringfyi for converting JSON object into the string format
    
    const result = await (await contract.evaluateTransaction('ReadMBMDAsset', ReqAssetId));
    console.log(`Successfully Retrived BaseModel Template Details from Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.send(result.toString());

  } catch (error) {
    console.error(error);
    console.error(`Failed to read assests from Blockchain": ${error}`);
    process.exit(1);
  }

}
exports.createMBSEBaseTemplate = async (req, res) => {



  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', 'ConnectionStrings', 'Org1LocalOrg1GatewayConnection.json');
    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);


    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);

    // For create method use JSON.Stringfyi for converting JSON object into the string format
    const modelData = req.body;
    const scKey = modelData.AssetId.toString();
    const scValue = JSON.stringify(modelData);
    const result = await (await contract.submitTransaction('CreateMBMDAsset', scKey, scValue));
    console.log(`Successfully Created BaseModel Template Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(result.toJSON());

  } catch (error) {
    console.error(error);
    console.error(`Failed to Create Base Model Asset": ${error}`);
    process.exit(1);
  }


}
exports.updateMBSEBaseTemplate = async (req, res) => {
  let userData = {};
  console.log("Method Executed")

  try {
    // load the network configuration
    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);


    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);


    // For create method use JSON.Stringfyi for converting JSON object into the string format
    const modelData = req.body;
    const scKey = modelData.AssetId.toString();
    const scValue = JSON.stringify(modelData);
    const result = await (await contract.submitTransaction('UpdateMBMDAsset', scKey, scValue));
    console.log(`Successfully Updated BaseModel Template Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(result.toJSON());

  } catch (error) {
    console.error(error);
    console.error(`Failed to update BaseModel Asset: ${error}`);
    process.exit(1);
  }
}

exports.getMBSEVariantTemplate = async (req, res) => {



  try {
    // load the network configuration
    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const ReqAssetId = req.body.AssetId;
    const walletPath = path.join(process.cwd(), 'Wallet'); // Change it from Database
    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);

    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);


    // For create method use JSON.Stringfyi for converting JSON object into the string format
    const result = await (await contract.evaluateTransaction('ReadMVMDAsset', ReqAssetId)); // Query parameters
    console.log(`Successfully Retrived Variant Model Template Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.send(result.toString());

  } catch (error) {
    console.error(error);
    console.error(`Failed to Retrive Variant Model Template ${error}`);
    process.exit(1);
  }

}
exports.createMBSEVariantTemplate = async (req, res) => {


  console.log("Method Executed")

  try {

    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet'); // Change it from Database
    const wallet = await Wallets.newFileSystemWallet(walletPath); //

    const identity = await wallet.get(identityName);

    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);


    // For create method use JSON.Stringfyi for converting JSON object into the string format
    const varinatModelData = req.body;
    const scKey = varinatModelData.AssetId.toString();
    const scValue = JSON.stringify(varinatModelData);
    const result = await (await contract.submitTransaction('CreateMVMDAsset', scKey, scValue));
    console.log(`Successfully Created Variant Model Template Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(result.toJSON());

  } catch (error) {
    console.error(error);
    console.error(`Failed create Variant Model Template": ${error}`);
    process.exit(1);
  }
}
exports.updateMBSEVariantTemplate = async (req, res) => {


  try {

    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet'); // Change it from Database
    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);

    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);


    const modelData = req.body;
    const scKey = modelData.AssetId.toString();
    const scValue = JSON.stringify(modelData);
    const result = await (await contract.submitTransaction('UpdateMVMDAsset', scKey, scValue));
    console.log(`Successfully Updated Variant Model Template Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(result.toJSON());

  } catch (error) {
    console.error(error);
    console.error(`Failed to update Variant Model": ${error}`);
    process.exit(1);
  }


}
exports.getMBSEModel = async (req, res) => {

  let userData = {};
  console.log("Method Executed")

  try {
    // load the network configuration
    console.log(ccpPath)
    const ReqAssetId = req.body.AssetId;
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);


    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);


    const result = await (await contract.evaluateTransaction('ReadMMAsset', ReqAssetId)); // Query parameters
    console.log(`Successfully Retrived MBSE Model Template Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.send(result.toString());

  } catch (error) {
    console.error(error);
    console.error(`Failed to Retrived MBSE Model Template": ${error}`);
    process.exit(1);
  }

}
exports.createMBSEModel = async (req, res) => {
  let userData = {};
  console.log("Method Executed")

  try {
    // load the network configuration
    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet'); // Change it from Database
    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);


    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);


    // For create method use JSON.Stringfyi for converting JSON object into the string format
    const baseModelData = req.body;
    const scKey = baseModelData.AssetId.toString();
    const scValue = JSON.stringify(baseModelData);
    const result = await (await contract.submitTransaction('CreateMMAsset', scKey, scValue));
    console.log(`Successfully Created MBSE Model Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(result.toJSON());

  } catch (error) {
    console.error(error);
    console.error(`Failed Created MBSE Model Asset in Blockchain": ${error}`);
    process.exit(1);
  }

}
exports.updateMBSEModel = async (req, res) => {

  console.log("Method Executed")

  try {

    console.log(ccpPath)
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'Wallet'); // Change it from Database
    const wallet = await Wallets.newFileSystemWallet(walletPath); //
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(identityName);

    const gateway = new Gateway();

    await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(smartContractName);

    // Evaluate the specified transaction.
    // For create method use JSON.Stringfyi for converting JSON object into the string format
    const modelData = req.body;
    const scKey = modelData.AssetId.toString();
    const scValue = JSON.stringify(modelData);
    const result = await (await contract.submitTransaction('UpdateMMAsset', scKey, scValue));
    console.log(`Successfully Updated MBSE Model Asset in Blockchain`);

    // Disconnect from the gateway.
    await gateway.disconnect();
    return res.json(result.toJSON());

  } catch (error) {
    console.error(error);
    console.error(`Successfully Updated MBSE Model Asset in Blockchain": ${error}`);
    process.exit(1);
  }

}