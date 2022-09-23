
const config = require("../util/config");
const { uuid, empty } = require("uuidv4");

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
const BASETemplate = "BASETemplate";
const VARIANTTemplate = "VARIANTTemplate";
const MBSEModel = "MBSEModel";

var multer = require('multer');
const path = require("path");
const { dirname } = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..',"/","uploads") );
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + path.join(`.${ext}`)); //Appending extension
  },
});

// var storage = multer.diskStorage({

//var upload = multer({ storage: storage }).single('file');

var multipleUpload = multer({storage:storage}).array('files');

exports.getAllBaseModelTemplate = async (req, res) => {
  // Working
  try {
    console.log("entered getAllBaseModelTemplate method");
    var allBaseModelTemplate = `SELECT * FROM "Consortium_DB"."MBSEBaseModelDesc"`
    let result = await db.ExecuteSqlQuery(allBaseModelTemplate);
    res.json(result.rows);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching base Model Templates"
    })
  }
};
exports.getAllVariantModelTemplate = async (req, res) => {
  try {
    console.log("entered getAllVariantModelTemplate method");
    var allVariantModelTemplate = `SELECT * FROM "Consortium_DB"."MBSEVariantModelDesc"`
    let result = await db.ExecuteSqlQuery(allVariantModelTemplate);
    res.json(result.rows);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Variant Model Templates"
    })
  }


};
exports.getAllMBSEModel = async (req, res) => {
  try {
    console.log("entered getAllMBSEModel method");
    var allMBSEModel = `SELECT mbse.*, v."VersionString", v."SubVersionString" FROM "Consortium_DB"."MBSEModel" mbse left join (select distinct "VersionId", "VersionString", "SubVersionString" from "Consortium_DB"."Version") v on mbse."VersionId" = v."VersionId"`
    let result = await db.ExecuteSqlQuery(allMBSEModel);
    res.json(result.rows);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Model Models"
    })
  }

};


exports.getSingleFileDetails = async (req, res) => {
  var fileName =req.params['fileName'];
  try {
    console.log("entered getSingleFileDetails method");
    var path = fileName.includes('/uploads') ? fileName : '/uploads/'+ fileName;
    const appDir = dirname(require.main.filename);
    res.sendFile(appDir+path);
    
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching SingleFileDetails"
    })
  }

}
exports.getFileDetails = async (req, res) => {
  var docId =req.params['docId'];
  try {
    console.log("entered getFileDetails method");
    var fetchdocData = `SELECT "DocPackage"."DocPath" as "filename" ,"DocPackage"."Doc_Pack_Name"  as "originalname" from  "Consortium_DB"."DocPackage" where "DocPackage"."DocId"='${docId}'`
    let result = await db.ExecuteSqlQuery(fetchdocData);
    res.json(result.rows);
    
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Model Models"
    })
  }

}
// getAllFilePaths()

exports.getTemplateModels = async (req, res) => {
  try {
    console.log("entered getTemplateModels method");
    // var model = req.param('model');
    if (req.body.model === 'variant') { var modelTable = "MBSEBaseModelDesc"; var modelField = 'MBMD_Name'; var modelID = 'MBMD_Id' }
    else if (req.body.model === 'mbse') { var modelTable = "MBSEVariantModelDesc"; var modelField = 'MVMD_Name'; var modelID = 'MVMD_Id' }
    var modelNames = `SELECT DISTINCT "${modelField}" as label, "${modelID}" as value From "Consortium_DB"."${modelTable}"`
    let result = await db.ExecuteSqlQuery(modelNames);
    res.json(result.rows);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Template Models Names"
    })
  }

};

exports.fileUpload = async (req, res) => {
  return multipleUpload(req,res,(err) => {
    if(err){
      console.log(err)
    }
    res.json({ filepath : req.files});
  })
};


exports.createBaseModelTemplate = async (req, res) => {
  try {
    console.log("entered createBaseModelTemplate method");
    let baseModelInput = req.body;
    let projectInput = req.body;
    console.log("re", baseModelInput);
    if (baseModelInput.MBMD_Id == undefined || baseModelInput.MBMD_Id == null || baseModelInput.MMD_Name == undefined || baseModelInput.MMD_Name == null || baseModelInput.description == undefined || baseModelInput.description == null|| projectInput.Project_Id == undefined || projectInput.Project_Id == null ) {
      res.json({
        ErrorMessage: "Issues with inputs in BaseModel Tempalte Object"
      })
    }
    if (baseModelInput.filepaths.length > 0) {
      console.log("index");
      DocId = await insertModelDocuments(MBSEModel, baseModelInput.filepaths, baseModelInput.MMD_Name);
    } else {
      DocId = "File Not Available";
    }

    let countQueryFromBaseModelTemplate = `select count(*) from "Consortium_DB"."MBSEBaseModelDesc"`;
    let queryCount = await db.ExecuteSqlQuery(countQueryFromBaseModelTemplate);
    let index = Number(queryCount.rows[0].count) + 1;
    console.log("index", index)
    let createBaseModelTemplateQuery = `INSERT INTO "Consortium_DB"."MBSEBaseModelDesc"("MBMD_Id", "MBMD_Name", description,"DocId", "Creator", "Created Date", "Project_Id")VALUES ('${index}', '${baseModelInput.MMD_Name}', '${baseModelInput.description}','${DocId}', '{${baseModelInput.Creator}}', '${baseModelInput.CreatedDate}','${projectInput.Project_Id}' )`
    let result = await db.ExecuteSqlQuery(createBaseModelTemplateQuery);
 // ----------------------------------------------------------- Blockchain Integration Changes
    // Basemodel Asset
    let baseModelTemplate = {
      AssetId: uuid(),
      AssetType: "MBSEBaseModelDesc",
      MBSEBaseModelDesc: {
        ModelName: baseModelInput.MMD_Name,
        BaseModelDesc: baseModelInput.description
      },
      CreatedDate: new Date().toISOString(),
      LastModifyDate: new Date().toISOString()
    };
    console.log(baseModelTemplate)
    instance.post('/createMBSEBaseTemplate', baseModelTemplate)
      .then(async function (response) {
        let createBaseModelTemplateQueryBCAsset = `INSERT INTO "Consortium_DB"."BC_Asset"("AssetId", "MBMD_Id") VALUES ('${baseModelTemplate.AssetId}','${index}');`
        let result = await db.ExecuteSqlQuery(createBaseModelTemplateQueryBCAsset);
        console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
    //-----------------------------------------------------------

    res.json({
      isCreated: true,
      MBMD_Id:index
    });
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Model Models"
    })
  }

};
exports.createVariantModelTemplate = async (req, res) => {
  try {
    let projectInput = req.body;
    console.log("entered createVariantModelTemplate method");
    let variantModelInput = req.body;
    if (variantModelInput.MBMD_Id == undefined || variantModelInput.MBMD_Id == null || variantModelInput.MVMD_Name == undefined || variantModelInput.MVMD_Name == null || variantModelInput.description == undefined || variantModelInput.description == null|| projectInput.Project_Id == null||projectInput.Project_Id == undefined) {
      return res.json({
        ErrorMessage: "Issues with inputs in Variant template Object"
      })
    }
    
    let DocId;
    if (variantModelInput.filepaths.length > 0) {
      console.log("index");
      DocId = await insertModelDocuments(MBSEModel, variantModelInput.filepaths, variantModelInput.MMD_Name);
    } else {
      DocId = "File Not Available";
    }
    let countQueryForVariantModelTemplate = `select count(*) from "Consortium_DB"."MBSEVariantModelDesc"`;

    let queryCount = await db.ExecuteSqlQuery(countQueryForVariantModelTemplate);
    let index = Number(queryCount.rows[0].count) + 1;
    console.log("srep1");
    // var createVariantModelTemplateQuery = `INSERT INTO "Consortium_DB"."MBSEVariantModelDesc"("MVMD_Id", "MVMD_Name", "Var_Type", description, "MBMD_Id","DocId") VALUES('${index}', '${variantModelInput.MVMD_Name}', '', '${variantModelInput.description}', '${variantModelInput.MBMD_Id}','${DocId}')`
    var createVariantModelTemplateQuery = `INSERT INTO "Consortium_DB"."MBSEVariantModelDesc"("MVMD_Id", "MVMD_Name", description, "MBMD_Id","DocId", "Creator", "Created Date", "Project_Id") VALUES('${index}', '${variantModelInput.MVMD_Name}', '${variantModelInput.description}', '${variantModelInput.MBMD_Id}','${DocId}', '{${variantModelInput.Creator}}', '${variantModelInput.CreatedDate}', '${projectInput.Project_Id}')`
    console.log(createVariantModelTemplateQuery)
    let result = await db.ExecuteSqlQuery(createVariantModelTemplateQuery);
    // ----------------------------------------------------------- Blockchain Integration Changes
    // Variant Template
    let variantModelTemplate = {
      AssetId: uuid(),
      AssetType: "MBSEVariantModelDesc",
      MBSEVariantModelDesc:
      {
        ModelName: variantModelInput.MVMD_Name,
        VariantModelDesc: variantModelInput.description,
      },
      CreatedDate: new Date().toISOString(),
      LastModifyDate: new Date().toISOString()
    };
    instance.post('/createMBSEVariantTemplate', variantModelTemplate)
      .then(async function (response) {
        let createVariantModelTemplateQueryBCAsset = `INSERT INTO "Consortium_DB"."BC_Asset"("AssetId", "MVMD_Id") VALUES ('${variantModelTemplate.AssetId}','${index}');`
        let result = await db.ExecuteSqlQuery(createVariantModelTemplateQueryBCAsset);
      })
      .catch(function (error) {
        // console.log(error);
      });
    console.log(variantModelTemplate)
    // ----------------------------------------------------------- 

    if (result != null || result != undefined) {
      res.json({
        MVMD_Id:index,
        isCreated: true
      });
    }

  } catch (error) {
    console.log(error)
    res.json({
      ErrorMessage: "Issue with saving mode Model Models"
    })
  }
  //res.send('Ok')
};

exports.createMBSEModel = async (req, res) => {
  try {
    console.log("entered createMBSEModel method");
    let mbseModelInput = req.body;
    let projectInput = req.body;
    if (mbseModelInput.MVMD_Id == undefined || mbseModelInput.MVMD_Id == null || mbseModelInput.Model_Name == undefined || mbseModelInput.Model_Name == null || mbseModelInput.description== undefined|| mbseModelInput.description == null|| mbseModelInput.VersionString == undefined || mbseModelInput.VersionString == null || mbseModelInput.SubVersionString == undefined || mbseModelInput.SubVersionString == null ) {
      return res.json({
        ErrorMessage: "Issues with inputs in mbseModelInput Object"
      })
    }

    let DocId;
    if (mbseModelInput.filepaths.length > 0) {
      console.log("index");
      DocId = await insertModelDocuments(MBSEModel, mbseModelInput.filepaths, mbseModelInput.Model_Name);
    } else {
      DocId = "File Not Available";
    }
    // Need to update foriegn and primary key for version tables based on version and subversion string
    // Removed two columns from MBSE Model
    // Need to store documentType, ModelTemplate id's in dockpackage table and update foreign key relationship
    // VersionId
    let countQueryForVersion = `select count(*) from "Consortium_DB"."Version"`;
    let versionQueryCount = await db.ExecuteSqlQuery(countQueryForVersion);
    let versionIndex = Number(versionQueryCount.rows[0].count) + 1;
    let versionQuery = `INSERT INTO "Consortium_DB"."Version"("VersionId","VersionString", "SubVersionString", "StartTime", "EndTime", description)VALUES ('${versionIndex}','${mbseModelInput.VersionString}', '${mbseModelInput.SubVersionString}', '11:10', '12:10', 'Test')`
    let versionQueryResult = await db.ExecuteSqlQuery(versionQuery);

    let countQueryForMBSEModel = `select count(*) from "Consortium_DB"."MBSEModel"`;
    let queryCount = await db.ExecuteSqlQuery(countQueryForMBSEModel);
    let index = Number(queryCount.rows[0].count) + 1;
    // let DocId;
   // let DocId = await insertModelDocuments(MBSEModel, mbseModelInput.file, mbseModelInput.Model_Name);
    console.log(DocId)
    var createMBSEModelTemplateQuery = `INSERT INTO "Consortium_DB"."MBSEModel"("MM_Id", "MM_Name", "description", "VersionId", "DocId", "MVMD_Id", "Creator", "Created Date","Project_Id") VALUES (${index},'${mbseModelInput.Model_Name}','${mbseModelInput.description}', '${versionIndex}', '${DocId}', ${mbseModelInput.MVMD_Id},'{${mbseModelInput.Creator}}', '${mbseModelInput.CreatedDate}', ${projectInput.Project_Id});`
    let result = await db.ExecuteSqlQuery(createMBSEModelTemplateQuery);
   // ----------------------------------------------------------- Blockchain Integration Changes
   // MBSE Asset
   let mbseModelJson = { 
    AssetId: uuid(),
    AssetType:" MBSEModel",
    MBSEModel: { 
      ModelDesc: mbseModelInput.description,
      ModelName: mbseModelInput.Model_Name, 
    }, 
    Version: { 
      Version: mbseModelInput.VersionString, 
      Subversion: mbseModelInput.SubVersionString, 
      StartTime: new Date().toISOString(),
      EndTime: new Date().toISOString()
    },
     CreatedDate: new Date().toISOString(),
      LastModifyDate: new Date().toISOString()
    };
    instance.post('/createMBSEModel', mbseModelJson)
    .then(async function (response) {
      let createMBSEModelTemplateQueryBCAsset = `INSERT INTO "Consortium_DB"."BC_Asset"("AssetId", "MM_Id") VALUES ('${mbseModelJson.AssetId}','${index}');`
        let result = await db.ExecuteSqlQuery(createMBSEModelTemplateQueryBCAsset);
      
    })
    .catch(function (error) {
     //  console.log(error);
    });
      // ----------------------------------------------------------- 
      
      if (result != null || result != undefined) {
        return res.json({
          MVMD_Id:index,
          isCreated: true
        });
      }

  } catch (error) {
    console.log(error)
    return res.json({
      ErrorMessage: "Issue with saving variant model"
    })
  }
};
exports.mapProjectWithModel = async (req, res) => {
  // need to implement
  //Not Working
  try {
    console.log("entered mapProjectWithModel method");
    let mapProjectWithModel = req.body;
    if (mapProjectWithModel.MBMD_Id == undefined || mbseModelInput.MBMD_Id == null || mbseModelInput.MMD_Name == undefined || mbseModelInput.MMD_Name == null || mbseModelInput.description == undefined || mbseModelInput.description == null) {
      res.json({
        ErrorMessage: "Issues with inputs in mbseModelInput Object"
      })
    }
    let countQueryForMBSEModel = ` "select count(*) from "Consortium_DB"."MBSEModel"`;
    let queryCount = await db.ExecuteSqlQuery(countQueryForMBSEModel);
    var createMVSEModelTemplateQuery = `INSERT INTO "Consortium_DB"."MBSEModel"("MM_Id", "Model_Name", "description', "descriptiMVMD_Idon", "VersionString", "PreviousVersionString") VALUES (${queryCount.rows[0] + 1}, ${mbseModelInput.Model_Name}, ${mbseModelInput.Model_Name}, ${mbseModelInput.description}, '',  ${mbseModelInput.version});` // need to implement versioning and DocId
    let result = await db.ExecuteSqlQuery(createMVSEModelTemplateQuery);
    console.log(result)
    res.json({
      isCreated: true
    });
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Model Models"
    })
  }
};
exports.updateBaseModelTemplate = async (req, res) => {
  try {
    let baseModelInput = req.body;
    if (baseModelInput.MBMD_Id == undefined || baseModelInput.MBMD_Id == null || baseModelInput.MMD_Name == undefined || baseModelInput.MMD_Name == null || baseModelInput.description == undefined || baseModelInput.description == null) {
      res.json({
        ErrorMessage: "Issues with inputs in mbseModelInput Object"
      })
    }
    let DocId = baseModelInput.DocId
    if (baseModelInput.documentList != 0) {
      //deActivateModels(BASETemplate,baseModelInput.MBMD_Id)
      DocId = await insertModelDocuments(MBSEModel, baseModelInput.documentsList, baseModelInput.MMD_Name);
    }
    let updateBaseModelTemplateQuery = `UPDATE "Consortium_DB"."MBSEBaseModelDesc" SET "MMD_Name"='${baseModelInput.MMD_Name}', description='${baseModelInput.description}', "DocId"='${DocId}' WHERE "MBMD_Id"='${baseModelInput.MBMD_Id}'`
    let result = await db.ExecuteSqlQuery(updateBaseModelTemplateQuery);
    res.json({
      isUpdated: true
    });
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Model Models"
    })
  }
};
exports.updateVariantModelTemplate = async (req, res) => {
  try {
    console.log("entered updateVariantModelTemplate method");
    let variantModelInput = req.body;
    if (variantModelInput.MBMD_Id == undefined || variantModelInput.MBMD_Id == null || variantModelInput.MVMD_Name == undefined || variantModelInput.MVMD_Name == null || variantModelInput.description == undefined || variantModelInput.description == null || variantModelInput.MVMD_Id == undefined || variantModelInput.MVMD_Id == null||projectInput.Project_Id == null||projectInput.Project_Id == undefined) {
      return res.json({
        ErrorMessage: "Issues with inputs in Variant template Object"
      })
    }
    let DocId = variantModelInput.DocId;
    if (variantModelInput.documentList != 0) {
      DocId = await insertModelDocuments(MBSEModel, variantModelInput.documentsList, variantModelInput.MMD_Name);
    }

    var updateVariantModelTemplateQuery = `UPDATE "Consortium_DB"."MBSEVariantModelDesc" SET "MVMD_Id"='${variantModelInput.MVMD_Id}', "MVMD_Name"='${variantModelInput.MVMD_Name}', description='${variantModelInput.description}', "MBMD_Id"='${variantModelInput.MBMD_Id}', "Project_Id" = ${projectInput.Project_Id }, "DocId"='${DocId}' WHERE "MVMD_Id"='${variantModelInput.MVMD_Id}'`
    let result = await db.ExecuteSqlQuery(updateVariantModelTemplateQuery);
    if (result != null || result != undefined) {
      res.json({
        isUpdated: true
      });
    }

  } catch (error) {
    console.log(error)
    res.json({
      ErrorMessage: "Issue with saving mode Model Models"
    })
  }

};
exports.updateMBSEModel = async (req, res) => {
  try {
    console.log("entered updateMBSEModel method");
    let mbseModelInput = req.body;
    if (mbseModelInput.MM_Id == undefined || mbseModelInput.MM_Id == null || mbseModelInput.Model_Name == undefined || mbseModelInput.Model_Name == null || mbseModelInput.VersionString == undefined || mbseModelInput.VersionString == null) {
      res.json({
        ErrorMessage: "Issues with inputs in mbseModelInput Object"
      })
    }
    // Need to update foriegn and primary key for version tables based on version and subversion string
    // Removed two columns from MBSE Model
    // Need to store documentType, ModelTemplate id's in dockpackage table and update foreign key relationship
    let versionQuerySelect = `SELECT * FROM "Consortium_DB"."Version" Where "VersionId"='${mbseModelInput.VersionId}'`
    let versionQuery = await db.ExecuteSqlQuery(versionQuerySelect)
    let versionQueryResult = versionQuery.rows[0];
    console.log("--------");

    let versionId = mbseModelInput.VersionId;
    if (versionQueryResult.VersionString != mbseModelInput.VersionString || versionQueryResult.SubVersionString != mbseModelInput.SubVersionString) {
      console.log("Testing Here")
      let versionQueryCount = `SELECT count(*) FROM "Consortium_DB"."Version"`
      let queryCount = await db.ExecuteSqlQuery(versionQueryCount);
      console.log(queryCount.rows)
      let versionIndex = Number(queryCount.rows[0].count) + 1;
      console.log("--------" + versionIndex);
      let versionQuery = `INSERT INTO "Consortium_DB"."Version"("VersionId","VersionString", "SubVersionString", "StartTime", "EndTime", description)VALUES ('${versionIndex}','${mbseModelInput.VersionString}', '${mbseModelInput.SubVersionString}', '11:10', '12:10', 'Test')`
      let versionUpdateQueryResult = await db.ExecuteSqlQuery(versionQuery);
      versionId = versionIndex;
    }
    console.log("-------- started inserting documetns");
    let DocId = mbseModelInput.docId;
    if (mbseModelInput.documentList != 0) {
      //deActivateModels(variantModelInput.DocId)
      DocId = await insertModelDocuments(MBSEModel, mbseModelInput.documentsList, mbseModelInput.MMD_Name);
      console.log("-------- completed inserting documetns");
    }

    var updateMBSEModelTemplateQuery = `UPDATE "Consortium_DB"."MBSEModel" SET "MM_Id"='${mbseModelInput.MM_Id}', "Model_Name"='${mbseModelInput.Model_Name}', description='${mbseModelInput.description}', "VersionId"='${versionId}', "DocId"='${DocId}' WHERE "MM_Id"='${mbseModelInput.MM_Id}'`
    let result = await db.ExecuteSqlQuery(updateMBSEModelTemplateQuery);
    res.json({
      isCreated: true
    });

  } catch (error) {
    return res.json({
      ErrorMessage: "Issue with saving variant model"
    })
  }
};
exports.getABaseModelTemplateById = async (req, res) => {

  try {
    console.log("entered getAllBaseModelTemplate method");
    let MBMD_Id = req.body.MBMD_Id;
    var baseModelTempalateQuery = `SELECT * FROM "Consortium_DB"."MBSEBaseModelDesc" where "MBMD_Id"='${MBMD_Id}'`
    let result = await db.ExecuteSqlQuery(baseModelTempalateQuery);
    let baseModelTemplate = result.rows[0];
    console.log(baseModelTemplate);
    let documents = getDocumentsByDocId(baseModelTemplate.DocId);

    baseModelTemplate['documentsList'] = documents;
    res.json(baseModelTemplate);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching base Model Templates"
    })
  }
};
exports.getVariantModelTemplateById = async (req, res) => {

  try {
    console.log("entered getAllBaseModelTemplate method");
    let MVMD_Id = req.body.MVMD_Id;
    var variantModelTempalateQuery = `SELECT * FROM "Consortium_DB"."MBSEVariantModelDesc" where "MVMD_Id"='${MVMD_Id}'`
    let result = await db.ExecuteSqlQuery(variantModelTempalateQuery);
    let variantModelTemplate = result.rows[0];
    let documents = getDocumentsByDocId(variantModelTemplate.DocId);
    variantModelTemplate['documentsList'] = documents;
    res.json(variantModelTemplate);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching base Model Templates"
    })
  }
};
exports.getMBSEModelById = async (req, res) => {

  try {
    console.log("entered getAllBaseModelTemplate method");
    let MM_Id = req.body.MM_Id;
    var mbseModelQuery = `SELECT * FROM "Consortium_DB"."MBSEModel" where "MM_Id"='${MM_Id}'`
    let result = await db.ExecuteSqlQuery(mbseModelQuery);
    let mbseModel = result.rows[0];
    let documents = getDocumentsByDocId(mbseModel.DocId);
    mbseModel['documentsList'] = documents;
    res.json(mbseModel);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching base Model Templates"
    })
  }
};
async function insertModelDocuments(modelType, filepaths, modelName) {
  try {
    let countQueryFoDocPackage = `select count(*) from "Consortium_DB"."Document"`;
    let documentPackageQueryCount = await db.ExecuteSqlQuery(countQueryFoDocPackage);
    let docId = Number(documentPackageQueryCount.rows[0].count) + 1;
    let documentInsertQuery = `INSERT INTO "Consortium_DB"."Document"("DocId", "DocType", "description")VALUES ('${docId}', '${modelType}', '${modelName}')`;
    let result = await db.ExecuteSqlQuery(documentInsertQuery);
    if(filepaths.length > 0){
      for (const document of filepaths) {
        var docpath = document.path.split("uploads").pop();
        var finalDocPath =  "uploads" + docpath;
        let countQueryFoDocPackIdCount = `select count(*) from "Consortium_DB"."DocPackage"`;
        let DocPackIdCount = await db.ExecuteSqlQuery(countQueryFoDocPackIdCount);
        let docPackId = Number(DocPackIdCount.rows[0].count) + 1;
        let docPackageQuery = `INSERT INTO "Consortium_DB"."DocPackage"("Doc_Pack_Id", "Doc_Pack_Name", "DocType","DocId","DocPath","isActive")VALUES ('${docPackId}','${document.originalname}','${modelType}','${docId}','${finalDocPath}','true')`
        let result1 = await db.ExecuteSqlQuery(docPackageQuery);
      }
    } 
    return docId;

  } catch (error) {
    throw error
  }
}
async function getDocumentsByDocId(docId){
  console.log(docId)
  let documentsList = `select * from "Consortium_DB"."DocPackage" where "DocId"='${docId}'`;
    let queryCount = await db.ExecuteSqlQuery(documentsList);
    let documents = queryCount.rows;
    return documents;
}
exports.getAllProjects = async (req, res) => {
  try {
    console.log("entered getAllProjects method");
    var AllProjects = `SELECT "Project"."Name" FROM "Consortium_DB"."Project"` 
    let result = await db.ExecuteSqlQuery(AllProjects);
    res.json(result.rows);
    //res.render('ProjectName', {dropdownVals: result})
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Projects List",
    })
  }
};
// async function deActivateModels(docuId){
//   // Depricated Not needed
//   try {
//     //"Consortium_DB"."MBSEBaseModelDesc"
//     if(modelType == MBSEModel){
//       let docId = `select "DocId" from "Consortium_DB"."MBSEModel" where "MBMD_Id"='${modelId}'`
//     }else if(modelType == BASETemplate){
//       let docId = `select "DocId" from "Consortium_DB"."MBSEBaseModelDesc" where "MBMD_Id"='${modelId}'`
//     }else if (modelType == VARIANTTemplate){
//       let docId = `select "DocId" from "Consortium_DB"."MBSEVariantModelDesc" where "MBMD_Id"='${modelId}'`
//     }
//     let documentsQuery = `select * from "Consortium_DB"."DocPackage" where "MBMD_Id"='${docId}'`
//     let documentList = await db.ExecuteSqlQuery(documentsQuery).rows;
//     for (const document of documentList) {
//       let updateQuery = `UPDATE "Consortium_DB"."DocPackage" set "isActive" = false where "DocId"==${document.DocId}`
//       let documentResult = await db.ExecuteSqlQuery(documentsQuery).rows;
//     }
//   } catch (error) {

//     throw error
//   }
// }