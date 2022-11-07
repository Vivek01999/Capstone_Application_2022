const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:3002'
});
const config = require('./config.json')
const db = require('../util/db');

exports.getAffiliations = async(res,req) => {
    const payload = req.body;
    try {
        return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."OrgAffiliations" WHERE "Consortium_DB"."OrgAffiliations"."OrgId" = '${payload.orgId}'`)
          .then((data) => data.rows[0])
      }
      catch (error) {
        console.log(error)
      }

}