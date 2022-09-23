
const config = require("../util/config");
const { uuid } = require("uuidv4");


const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../util/validators");
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3001'
});
const db = require('../util/db');
// app.get("/createProject",cors(), getUserDetails);
// app.get("/updateProjectToModel",cors(), getUserDetails);
// app.get("/getAllProjects",cors(), getUserDetails);

exports.createProject = async(req, res) => {
  try{
    
    let projectInput = req.body;
    if ( projectInput.Name == undefined || projectInput.Name == null) {
      res.json({
        ErrorMessage: "Issues with inputs in Project Tempalte Object"
      })
    }
    let countQueryFromProject = `select count(*) from "Consortium_DB"."Project"`;
    let queryCount = await db.ExecuteSqlQuery(countQueryFromProject);
    let index = Number(queryCount.rows[0].count) + 1;
    console.log("count updated");
    let createProjectQuery = `INSERT INTO "Consortium_DB"."Project"("ID", "Name", "Desc","CreateDate") VALUES ('${index}', '${projectInput.Name}','${projectInput.Desc}','${new Date().toISOString()}')`
    let result = await db.ExecuteSqlQuery(createProjectQuery);      
      console.log("project created")
    return res.json({
      isCreated: true,
      message: "Project created sucessfully"
    });
  } catch (error) {
    console.log(error)
    return res.json({
      ErrorMessage: "Issue with Creating Project"
    })
  }
};
exports.updateProjectToModel = async(req, res) => {

  try {
    let projectInput = req.body;
    if ( projectInput.ProjectId == undefined || projectInput.ProjectId == null || projectInput.OrgID == undefined || projectInput.OrgID == null) {
      res.json({
        ErrorMessage: "Issues with inputs in updating project"
      })
    }
    
    let updateProjectToOrg = `INSERT INTO "Consortium_DB"."ProjectOrgRole"("ProjectId", "OrgID")
    VALUES (${projectInput.ProjectId},  ${projectInput.OrgID})`;
        
    let result = await db.ExecuteSqlQuery(updateProjectToOrg);
    res.status(201).send({
      message: "Project created sucessfully",
      isCreated: true
    });
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching project updates"
    })
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    console.log("entered getAllProjects method");
    var AllProjects = `SELECT "Project"."ID","Project"."Name" FROM "Consortium_DB"."Project"` 
    let result = await db.ExecuteSqlQuery(AllProjects);
    res.json(result.rows);
    //res.render('ProjectName', {dropdownVals: result})
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Projects List",
    })
  }
};

exports.getAllProjectsList= async (req, res) => {
  try {
    console.log("entered getAllProjects method");
    var AllProjects = `SELECT "Project"."Name", "Project"."CreateDate" FROM "Consortium_DB"."Project"` 
    let result = await db.ExecuteSqlQuery(AllProjects);
    res.json(result.rows);
    //res.render('ProjectName', {dropdownVals: result})
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Projects List",
    })
  }
};
exports.getAllOrgs = async (req, res) => {
  try {
    console.log("entered getAllorgs method");
    var AllOrgs = `SELECT "Organization"."OrgName","Organization"."OrgId" FROM "Consortium_DB"."Organization"` 
    let result = await db.ExecuteSqlQuery(AllOrgs);
    res.json(result.rows);
    //res.render('OrgNames', {dropdownVals: result})
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Org List",
    })
  }
};