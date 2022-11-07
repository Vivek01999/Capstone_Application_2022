const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:3002'
});
const config = require('./config.json')
const db = require('../util/db');

exports.getAffiliations = async(res,req) => {
    const payload = req.body;
    const orgid = getOrgID(payload.orgId)
    try {
        return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."OrgAffiliations" WHERE "Consortium_DB"."OrgAffiliations"."OrgId" = '${orgid}'`)
          .then((data) => data.rows[0])
      }
      catch (error) {
        console.log(error)
      }

}

const getOrgID = (org_name) => {
    try {
      return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."Organization" WHERE "Consortium_DB"."Organization"."OrgName" = '${org_name}'`)
        .then((data) => data.rows[0])
    }
    catch (err) {
      console.log(err)
    }
  }