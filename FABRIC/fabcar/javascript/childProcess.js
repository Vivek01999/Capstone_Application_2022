const { execFile } = require('child_process');
const { rmSync } = require('fs');

exports.enrollAdmin = async (req, res) => {
    //db insert lines

    const payload = req.body;
    const child = execFile('node', ['enrollAdmin.js', payload.orgName, payload.userName], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        res.json({ "status": stdout });
    });

}
exports.registerUser = async (req, res) => {
    //db insert lines
    console.log('request received', req.body);
    const payload = req.body;
    const child = execFile('node', ['registerUser.js', '--wallet', payload?.common?.wallet, "--organisationMSP", payload?.common?.organisationMSP, "--networkChannel", payload?.common?.networkChannel, "--smartContract", payload?.common?.smartContract, "--caAuth", payload?.adminDetails?.caAuth, "--adminIdentity", payload?.adminDetails?.adminIdentity, "--adminSecret", payload?.adminDetails?.adminSecret, "--userIdentity", payload?.registerUser?.userIdentity, "--role", payload?.registerUser?.role, "--affiliation", payload?.registerUser?.affiliation], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        res.json({ "status": stdout });
    });

}

exports.deleteUser = async (req, res) => {
    //db insert lines
    const payload = req.body;
    const child = execFile('node', ['deleteUser.js', '--wallet', payload?.adminDetails?.wallet, "--caAuth", payload?.adminDetails?.caAuth, "--adminIdentity", payload?.adminDetails?.adminIdentity, "--adminSecret", payload?.adminDetails?.adminSecret, "--userIdentity", payload?.deleteUser?.userIdentity, "--reason", payload?.deleteUser?.reason], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        if (stdout.includes("Success")) {
            res.json({ "status": true });
        } else {
            res.json({ "status": false });
        }
    });

}

exports.getUserList = async (req, res) => {
    //db insert lines
    const payload = req.body;
    const child = execFile('node', ['getUserList.js', '--wallet', payload?.adminDetails?.wallet, "--caAuth", payload?.adminDetails?.caAuth, "--adminIdentity", payload?.adminDetails?.adminIdentity], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        const response = JSON.parse(stdout).result;
        const reducedResp = response.identities.map((iden) => { return { id: iden.id, type: iden.type, affiliation: iden.affiliation } });
        // const filteredResponse = reducedResp.filter((val) => ['admin', 'peer0', 'user1', 'org1admin'].indexOf(val.id) < 0);
        res.json({ "userList": reducedResp });
    });

}

exports.updateFabricUser = async (req, res) => {
    //db insert lines
    const payload = req.body;
    console.log(payload);
    const child = execFile('node', ['updateFabricUser.js', '--wallet', payload?.common?.wallet, "--organisationMSP", payload?.common?.organisationMSP, "--networkChannel", payload?.common?.networkChannel, "--smartContract", payload?.common?.smartContract, "--caAuth", payload?.adminDetails?.caAuth, "--adminIdentity", payload?.adminDetails?.adminIdentity, "--adminSecret", payload?.adminDetails?.adminSecret, "--userIdentity", payload?.updateUser?.userIdentity, "--role", payload?.updateUser?.role, "--affiliation", payload?.updateUser?.affiliation], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        const response = JSON.parse(stdout.split("\n")[0]).success;
        res.json({ "status": response });
    });

}