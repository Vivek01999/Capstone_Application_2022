const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:3002'
});
const { v4: uuidv4 } = require('uuid');
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
        "Organization": await getOrgID(payload.registerUser.organization),
        "Affiliation": payload.registerUser.affiliation
    }
    instance.post('/registerUser', registerUserTemplate)
        .then(async function (response) {
            //console.log(response);
            await registerFabricUserToDB(dbPayload)
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
            await deleteFabricUserFromDB(req.body.deleteUser.userIdentity);
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

registerFabricUserToDB = async (input) => {
    try {
        await db.ExecuteSqlQuery(`INSERT into "Consortium_DB"."FabricUser"("FabricUserIdentity","FabricRole","OrgId","Affiliation", "ID") VALUES( '${input.FaricUserIdentity}','${input.FabricRole}','${input.Organization}','${input.Affiliation}', '${uuidv4()}')`)
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

const getOrgID = async (org_name) => {
    try {
        const resp = await db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."Organization" WHERE "Consortium_DB"."Organization"."OrgName" = '${org_name}'`)
        console.log(resp.rows);
        return resp.rows[0].OrgId;
    }
    catch (err) {
        res.status(400).send({ "error": "error occured while fetching orgId" })
    }
}

exports.getFabricUserListFromDB = async (req, res) => {
    const payload = req.body;
    try {
        const response = await db.ExecuteSqlQuery(`SELECT "ID","FabricUserIdentity" FROM "Consortium_DB"."FabricUser" where "OrgId"=${await getOrgID(payload.orgName)}`)
        res.send({ fabricUserIdentityList: response.rows })
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
}

exports.mapUserToFabricID = async (req, res) => {
    const payload = req.body;
    try {
        await db.ExecuteSqlQuery(`INSERT into "Consortium_DB"."UserFabUIDMapping"("UserId", "FabricId") VALUES('${payload.UserId}', '${payload.FabricId}')`)
        res.send({ status: 'success' })
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
}

deleteFabricUserFromDB = async (fabUserId) => {
    try {
        await db.ExecuteSqlQuery(`DELETE FROM "Consortium_DB"."FabricUser" where "FabricUserIdentity"='${fabUserId}'`)
        return true
    }
    catch (err) {
        console.log(err)
        return false;
    }
}