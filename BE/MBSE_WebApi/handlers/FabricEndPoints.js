const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:3002'
});
const config = require('./config.json')
const db = require('../util/db');


exports.registerFabricUser = async (req, res) => {

    const payload = req.body;
    const registerUserTemplate = {
        "common": {
            "wallet": config.wallet,
            "organisationMSP": config.organisationMSP,
            "networkChannel": config.networkChannel,
            "smartContract": config.smartContract
        },
        "adminDetails": {
            "caAuth": config.caAuth,
            "wallet": config.wallet,
            "adminIdentity": config.adminIdentity,
            "adminSecret": config.adminSecret
        },
        "registerUser": payload.registerUser
    };

    const dbPayload = {
        "FaricUserIdentity": payload.registerUser.userIdentity,
        "FabricRole": payload.registerUser.role,
        "Organization": "UHCL",
        "Affiliation": payload.registerUser.affiliation
    }
    instance.post('/registerUser', registerUserTemplate)
        .then(async function (response) {
            //console.log(response);
            registerFabricUserToDB(dbPayload)
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
            "caAuth": config.caAuth,
            "wallet": config.wallet,
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
            "caAuth": config.caAuth,
            "wallet": config.wallet,
            "adminIdentity": config.adminIdentity,
            "adminSecret": config.adminSecret
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
            "wallet": config.wallet,
            "organisationMSP": config.organisationMSP,
            "networkChannel": config.networkChannel,
            "smartContract": config.smartContract
        },
        "adminDetails": {
            "caAuth": config.caAuth,
            "wallet": config.adminIdentity,
            "adminIdentity": config.adminIdentity,
            "adminSecret": config.adminSecret
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

registerFabricUserToDB = (input) => {
    try {
        db.ExecuteSqlQuery(`INSERT into "Consortium_DB"."FabricUser"( "FabricUserIdentity","FabricRole","Organization","Affiliation") VALUES( '${input.FaricUserIdentity}','${input.FabricRole}','${input.Organization}','${input.Affiliation}')`)
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}