const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3002'
});


exports.registerFabricUser = async (req, res) => {
  
  console.log('request', req.body);
  //const payload = req.body;
  const registerUserTemplate = {
    "common":{
      "wallet": "wallet",
      "organisationMSP": "Org1MSP",
      "networkChannel":"mychannel",
      "smartContract":"fabcar"
    },
    "adminDetails": {
      "caAuth": "ca.org1.example.com",
      "wallet": "wallet",
      "adminIdentity": "admin",
      "adminSecret": "adminpw"
    },
    "registerUser": req.body.registerUser
  };
  instance.post('/registerUser', registerUserTemplate)
    .then(async function (response) {
      //console.log(response);
      res.send(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
}

exports.getUserList = async (req, res) => {
  console.log('request', req.body);
  //const payload = req.body;
  const userListTemplate = {
    "adminDetails": {
      "caAuth": "ca.org1.example.com",
      "wallet": "wallet",
      "adminIdentity": req.body.adminIdentity
    }
  }
  instance.post('/getUserList', userListTemplate)
    .then(async function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

}

exports.deleteUser = async (req, res) => {
  console.log('request', req.body);
  const deleteUserTemplate = {
    "adminDetails": {
      "caAuth": "ca.org1.example.com",
      "wallet": "wallet",
      "adminIdentity": "admin",
      "adminSecret": "adminpw"
    },
    "deleteUser": req.body.deleteUser
  };
  instance.post('/deleteUser', deleteUserTemplate)
    .then(async function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

}


exports.updateFabricUser = async (req, res) => {
  const updateUser = req.body.updateUser;
  const updateUserTemplate = {
    "common": {
      "wallet": "wallet",
      "organisationMSP": "Org1MSP",
      "networkChannel": "mychannel",
      "smartContract": "fabcar"
    },
    "adminDetails": {
      "caAuth": "ca.org1.example.com",
      "wallet": "wallet",
      "adminIdentity": "admin",
      "adminSecret": "adminpw"
    },
    "updateUser": {
      "userIdentity": updateUser.id,
      "role": updateUser.type,
      "affiliation": updateUser.affiliation
    }
  };
  instance.post('/updateFabricUser', updateUserTemplate)
    .then(async function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}