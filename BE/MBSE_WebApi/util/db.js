var pg = require('pg')

const config = {
    connectionString: "postgres://ysvgycyzkszbrp:9c18ee791514322a3fd14b3642850061366465eef3f976d19e98bac9d68999b3@ec2-3-209-61-239.compute-1.amazonaws.com:5432/d5bvmu0afudmj", // please udpate with connection string
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
