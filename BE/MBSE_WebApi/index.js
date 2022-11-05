const app = require("express")();
const cors = require("cors");
app.use(cors());
const port = 3000

const {
  getUserDetails
} = require("./handlers/users");
const db = require("./util/db");
const {
  getEmployeeDetails,
  getAllEmployees,
  login,
  mapEmployeeRole
} = require("./handlers/Employee");
const {
  fileUpload,
  createBaseModelTemplate,
  createMBSEModel,
  createVariantModelTemplate,
  getAllBaseModelTemplate,
  getAllMBSEModel,
  getAllVariantModelTemplate,
  mapProjectWithModel,
  updateBaseModelTemplate,
  updateMBSEModel,
  updateVariantModelTemplate,
  getTemplateModels,
  getABaseModelTemplateById,
  getVariantModelTemplateById,
  getMBSEModelById,
  getFileDetails,
  getSingleFileDetails
} = require("./handlers/Model");

const {
  createProject,
  getAllProjects,
  updateProjectToModel,
  getAllOrgs,
  getAllProjectsList
} = require("./handlers/Project");

const {
  registerFabricUser,deleteUser, getUserList, updateFabricUser
} = require("./handlers/FabricEndPoints");

const {
  getFabricUser
} = require("./handlers/getFabricUser");

const {
  fabUsrChangePassword
} = require("./handlers/fabUsrChangePassword");

app.get('/', (req, res) => {
  res.send('Hello World!')
})
var express = require("express");
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// multer package to recive multipart data in POST requests -> start here

const { path } = require("express/lib/application");
app.use(express.urlencoded({ extended: true }));
// app.use(upload.array());
// app.use(express.static('public'));
//multer package to recive multipart data in POST requests -> ends here

// users routes
// app.post("/signup", signup);
// app.post("/login", login);
// app.get("/blockchain/user", cors(),getUserDetails);
// app.post("/notifications", FBAuth, markNotificationsRead);
// Employee endpoints
app.get("/getEmployeeDetails", cors(), getEmployeeDetails);
app.post("/login", cors(), login);
app.get("/getAllEmployees", cors(), getAllEmployees);
app.post("/mapEmployeeRole", cors(), mapEmployeeRole);
// Model endpoints
app.get("/getAllBaseModelTemplate", cors(), getAllBaseModelTemplate);
app.get("/getAllVariantModelTemplate", cors(), getAllVariantModelTemplate);
app.get("/getAllMBSEModel", cors(), getAllMBSEModel);
app.post("/getTemplateModels", cors(), getTemplateModels);
app.post("/createBaseModelTemplate", cors(), createBaseModelTemplate);
app.post("/fileUpload", cors(), fileUpload);
app.post("/createVariantModelTemplate", cors(), createVariantModelTemplate);
app.post("/createMBSEModel", cors(), createMBSEModel);
app.post("/mapProjectWithModel", cors(), mapProjectWithModel);
app.post("/updateBaseModelTemplate", cors(), updateBaseModelTemplate);
app.post("/updateVariantModelTemplate", cors(), updateVariantModelTemplate);
app.post("/updateMBSEModel", cors(), updateMBSEModel);
app.post("/getABaseModelTemplateById", cors(), getABaseModelTemplateById);
app.post("/getVariantModelTemplateById", cors(), getVariantModelTemplateById);
app.post("/getMBSEModelById", cors(), getMBSEModelById);

// Project endpoints
app.post("/createProject", cors(), createProject);
// app.get("/mapProjectToModel",cors(), mapProjectToModel);
app.post("/updateProjectToModel", cors(), updateProjectToModel);
app.get("/getAllProjects", cors(), getAllProjects);
app.get("/getAllOrgs", cors(), getAllOrgs);
app.get("/getAllProjectsList", cors(), getAllProjectsList);
app.get("/getFileDetails/:docId", cors(), getFileDetails);
app.get("/getSingleFileDetails/:fileName", cors(), getSingleFileDetails);
app.get("/getSingleFileDetails/uploads/:fileName", cors(), getSingleFileDetails);
app.post("/registerUser", registerFabricUser);
app.get("/getFabricUser", getFabricUser);
app.post("/fabUsrChangePassword", fabUsrChangePassword);
app.post("/getUserList", cors(),getUserList);
app.post("/updateFabricUser", cors(),updateFabricUser);
app.post("/deleteUser", cors(),deleteUser);

app.listen(port, () => {
  db.CreateConnection();
  console.log(`Example app listening on port ${port}`)
})
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close((err) => {
    console.log('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});