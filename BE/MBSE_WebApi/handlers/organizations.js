
const db = require('../util/db');

exports.getOrganizationList = (req, res) => {
    db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."Organization" ORDER BY "OrgId" ASC`)
        .then((data) => {
            const reducedArray = data.rows.filter(org => org.OrgId != 0)
            res.send(reducedArray);
        })
        .catch((err) => {
            res.status(400).send({ message: "" + err })
        })
}