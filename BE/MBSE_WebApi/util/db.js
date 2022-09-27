var pg = require('pg')

const config = {
    connectionString: "postgres://travis:travisfall2022@capstone-fall2022-db.c2t3s8vrahet.us-west-1.rds.amazonaws.com:5432/postgres", // please udpate with connection string
    ssl: {
      rejectUnauthorized: false
    }
  };
var pool;
module.exports.CreateConnection= ()=>{
    pool = new pg.Pool(config);
    module.exports.pool = pool;
}

module.exports.ExecuteSqlQuery= (query)=>{
    console.log("entered Query Execution method");
    return new Promise((resolve, reject) => {
      console.log(query)
      pool.query(query, [], (err, result) => {
        console.log("Started Query Execution");
      if (err) {
        console.log(err)
        reject(err)
      }
      console.log(" Query Results");
     // console.log(result);
      resolve(result);
    });
  });
}
