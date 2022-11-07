
const db = require('../util/db');

exports.getAffiliations = async (req, res) => {
  const payload = req.body;
  console.log(req.body)
  const orgId = await getOrgID(payload.orgName)
  try {
    const response = await db.ExecuteSqlQuery(`SELECT "Affiliation" FROM "Consortium_DB"."OrgAffiliations" WHERE "OrgId" = ${orgId}`)
    const affiliations = response.rows.map(val => val.Affiliation);
    res.send({ affiliations });
  }
  catch (error) {
    console.log(error)
    res.status(400).send({ "error": "error occured while fetching affiliations" })
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