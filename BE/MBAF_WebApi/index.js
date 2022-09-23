const app = require("express")();
//const express = require('express');
//const app = express();
const cors = require("cors");
app.use(cors());

const port = 3001
//const cors = require("./util/db");
const {
  getUserDetails,
  getAssets
} = require("./handlers/users");

const {
  getMBSEBaseTemplate,
  getMBSEVariantTemplate,
  getMBSEModel,
  createMBSEBaseTemplate,
  createMBSEVariantTemplate,
  createMBSEModel,
  updateMBSEBaseTemplate,
  updateMBSEVariantTemplate,
  updateMBSEModel
} = require("./handlers/Model");
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
//app.use(express.bodyParser());
//app.use(express.methodOverride());

app.get('/', async(req, res) => {
  res.send('Hello World!')
})

// users routes
// app.post("/signup", signup);
// app.post("/login", login);
app.get("/user/:handle",cors(), getUserDetails);
app.get("/getAssets",cors(), getAssets);

// Get Methods
app.post("/getMBSEBaseTemplate",cors(),jsonParser, getMBSEBaseTemplate);
app.post("/getMBSEVariantTemplate",cors(), jsonParser,getMBSEVariantTemplate);
app.post("/getMBSEModel",cors(),jsonParser, getMBSEModel);
// Create Methods
app.post("/createMBSEBaseTemplate",cors(),jsonParser, createMBSEBaseTemplate);
app.post("/createMBSEVariantTemplate",cors(),jsonParser, createMBSEVariantTemplate);
app.post("/createMBSEModel",cors(),jsonParser, createMBSEModel);
// Update Methods
app.post("/updateMBSEBaseTemplate",cors(),jsonParser, updateMBSEBaseTemplate);
app.post("/updateMBSEVariantTemplate",cors(),jsonParser, updateMBSEVariantTemplate);
app.post("/updateMBSEModel",cors(),jsonParser,updateMBSEModel);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
