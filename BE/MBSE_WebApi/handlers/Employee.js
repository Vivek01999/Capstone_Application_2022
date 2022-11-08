const { v4: uuidv4 } = require('uuid');
const db = require('../util/db');


// Get any user's details
exports.getEmployeeDetails = (req, res) => {

  //Input Format=> Add more properties based on the UI Mock screen
  // {
  //   EmployeeId :1
  // }

  //OutputFormat=> Add more properties based on the UI Mock screen
  // If EmployeeId is valid
  //   {
  //     EmployeeId:1,
  //     EmployeeName:"shanmuk",
  //     RoleId:1,
  //     RoleName:"Manger",
  //    isValid: true
  //   }
  // If EmployeeId  is invalid
  // {
  //   isValid: false
  //  }

  // As per this function we need to get employee deatils based on the employee id
  // Steps 
  // 1) Need to get employeeid as an input from the UI 
  // 2) Need to fetch employee details based on input which present in req object
  // 3) Need to form Select SQL query based on the EmployeeId
  // 4) Need Execute SQL query with the help of postgrese class to fetch data
  // 5 ) Format data which Posrgrese class returns and return it to the UI with the help of Res Object res.send
  // try {
  //   console.log("entered getEmployeeDetails method");
  //   var allEmployees = `SELECT * FROM "Consortium_DB"."Employee"`
  //   // let result = await db.ExecuteSqlQuery(allEmployees);
  //   let result =  db.ExecuteSqlQuery(allEmployees);
  //   res.json(result.rows);

  // } catch (error) {
  //   res.json({
  //     ErrorMessage: "Issue with Fetching Employee Details"
  //   })
  // }

};
exports.login = (req, res) => {
  try {
    // debug
    console.log("login called")
    let input = req.body;
    if (input.Username == 'admin') {
      input.organizationId = 0;
    }
    console.log(input)
    findUser(input)
      .then(foundUser => {
        console.log(foundUser)


        if (checkPassword(input.Password, foundUser) == 0) {
          findRole(foundUser.EmployeeRoleID).then(employeeRoleRecord => {
            let employeeRoleName = employeeRoleRecord.Name
            res.status(200).json({
              "EmployeeId": foundUser.ID,
              "EmployeeName": foundUser.Name,
              "RoleName": employeeRoleName,
              "isValid": true
            })
          })


        } else {
          res.status(200).json({
            "isValid": false
          })
        }

      })
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching user information"
    })
  }
  //Input Format=> Add more properties based on the UI Mock screen
  // {
  //   username :"shanmuk",
  //   password:"12345"
  // }

  //OutputFormat=> Add more properties based on the UI Mock screen
  // If password is valid
  //   {
  //     EmployeeId:1,
  //     EmployeeName:"shanmuk",
  //     RoleId:1,
  //     RoleName:"Manger",
  //    isValid: true
  //   }
  // If password is invalid
  // {
  //    isValid: false
  //  }

  // As per this function we need to validate user name and password of the user based on the inputs provided in UI
  // Steps ;
  // 1) Need to get Username and Password from UI
  // 2) Need to fetch Username and Password based on input which present in req object
  // 3) Need to form Select SQL query to fetch employee username and password based on user name
  // 4) Need Execute SQL query with the help of postgrese class to fetch data
  // 5) Validate the data fetched from the sql query and send result to the UI
  // 6) Return result to the UI with the help of Res Object res.send

};
const findUser = (userReq) => {
  try {
    return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."Employee" WHERE "Consortium_DB"."Employee"."Username" = '${userReq.Username}' and "Consortium_DB"."Employee"."OrgId" = ${userReq.organizationId} `)
      .then((data) => data.rows[0])
  }
  catch (error) {
    console.log(error)
  }
}
const findIfUserMapped = (employee) => {
  try {
    return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."ProjectOrgRole" WHERE "Consortium_DB"."ProjectOrgRole"."EmpID" = ${employee.ID}`)
      .then((data) => data.rows[0])
  }
  catch (error) {
    console.log(error)
  }
}
const checkPassword = (reqPassword, foundUser) => {
  if (foundUser == undefined)
  // 1 here indicates the user record doesnt exist
  { return 1 }
  return reqPassword.localeCompare(foundUser.Password);
}


const findRole = (roleId) => {
  try {
    return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."EmployeeRole" WHERE "Consortium_DB"."EmployeeRole"."ID" = '${roleId}'`)
      .then((data) => data.rows[0])
  }
  catch (err) {
    console.log(err)
  }
}
exports.getAllEmployees = async (req, res) => {
  //OutputFormat=> Add more properties based on the UI Mock screen
  // [
  //   {
  //     EmployeeId:1,
  //     EmployeeName:"shanmuk",
  //     RoleId:1,
  //     RoleName:"Manger"
  //   },
  //   {
  //     EmployeeId:2,
  //     EmployeeName:"Sam",
  //     RoleId:2,
  //     RoleName:"Manger"
  //   }
  // ]
  // As per this function we need to get all the employees present in the database
  // Steps 
  // 1) We will not get any input from UI 
  // 2) Need to form Select SQL query to fetch all employees present in database  
  // 3) Need to form Select SQL query to fetch employee details
  // 4) Need Execute SQL query with the help of postgrese class to fetch data
  // 5)  Format data which Posrgrese class returns and return it to the UI with the help of Res Object res.send
  // 6) Return result to the UI with the help of Res Object res.send


  try {
    console.log("entered getAllemployee");
    var allEmp = `SELECT * FROM "Consortium_DB"."Employee"`
    let result = await db.ExecuteSqlQuery(allEmp);
    res.json(result.rows);
  } catch (error) {
    res.json({
      ErrorMessage: "Issue with Fetching Employee details"
    })
  }

  // db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."Employee"`)
  // .then((data) =>  data.rows[0])}
  // catch(err){
  //   console.log(err)
  // }
};
exports.mapEmployeeRole = (req, res) => {
  input = req.body
  findUser(input).then(foundUser => {
    console.log("new user", foundUser)
    if (foundUser != undefined) {
      console.log(foundUser)
      findIfUserMapped(foundUser).then(employeeOrgRole => {
        if (employeeOrgRole == undefined) {
          // check if project exist
          // check if organisation exist
          createOrgRole(foundUser.ID, input.ProjectID, foundUser.OrgId)
          return res.json({
            isMapped: true
          })
        }
        // console.log(employeeOrgRole)
      })
    }
    else {
      return res.json({
        isMapped: false
      })
    }
  })
  //Input Format=> Add more properties based on the UI Mock screen
  // {
  //   employeeId:1,
  //   roleId:1,
  //   role: "Manager"
  // }

  //OutputFormat=> Add more properties based on the UI Mock screen
  // If employee mapped with role 
  //   {
  //    isMapped: true
  //   }
  // If employee not mapped with role 
  // {
  //    isMapped: false
  //  }


  // As per this function we need to map employee with a employee role
  // Steps 
  // 1) Need to get employeeid as an input from the UI 
  // 2) Need to fetch employee details based on input which present in req object
  // 3) Need to form Select SQL query based on the EmployeeId
  // 4) Need Execute SQL query with the help of postgrese class to fetch data
  // 5 ) Format data which Posrgrese class returns and return it to the UI with the help of Res Object res.send



};

const createOrgRole = (empID, projectID, OrgId) => {

  try {
    db.ExecuteSqlQuery(`INSERT into "Consortium_DB"."ProjectOrgRole"("EmpID", "ProjectId","OrgID" ) VALUES( ${empID},${projectID},${OrgId})`)
  }
  catch (err) {
    console.log(err)
  }
}

// exports.createEmployee = (req, res) => {
//   input = req.body
// }

exports.postEmployee = (req, res) => {
  input = req.body
  const thruthvalue = createEmployee(input)
  if (thruthvalue) {
    res.json({
      "user_created": true
    })
  }
  else {
    res.json({
      "user_created": false
    })
  }
}

const createEmployee = (input) => {
  const UUID = uuidv4();
  try {
    db.ExecuteSqlQuery(`INSERT into "Consortium_DB"."Employee"( "ID","Name","Username","Password", "OrgId","EmployeeRoleID","Created_By","Created_Date" ) VALUES( '${UUID}','${input.name}','${input.username}','${input.password}',${input.orgId}, ${input.role},'${input.created_by}','${input.date}')`)
    return true
  }
  catch (err) {
    console.log(err)
    return false;
  }



}

const generatePassword = () => {
  // function(str, seed = 0) {
  //   let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  //     for (let i = 0, ch; i < str.length; i++) {
  //         ch = str.charCodeAt(i);
  //         h1 = Math.imul(h1 ^ ch, 2654435761);
  //         h2 = Math.imul(h2 ^ ch, 1597334677);
  //     }
  //     h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  //     h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  //     return 4294967296 * (2097151 & h2) + (h1>>>0);
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
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

const getRoleID = (role_name) => {
  try {
    return db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."EmployeeRole" WHERE "Consortium_DB"."EmployeeRole"."Name" = '${role_name}'`)
      .then((data) => data.rows[0])
  }
  catch (err) {
    console.log(err)
  }
}

exports.fetchUsers = async (req, res) => {
  const payload = req.body
  try {
    const response = await db.ExecuteSqlQuery(`SELECT * FROM "Consortium_DB"."Employee" WHERE "Consortium_DB"."Employee"."OrgId" = '${payload.OrgId}'`)
    const userList = response.rows;
    res.send({ userList });
  }
  catch (err) {
    res.status(400).send({ error: err });
  }

}