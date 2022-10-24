const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3002'
});


exports.registerFabricUser = async (req, res) => {
    console.log('request',req.body);
    //const payload = req.body;
    const registerUserTemplate = req.body;
    instance.post('/registerUser', registerUserTemplate)
    .then(async function (response) {
      //console.log(response);
        res.send(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
  
}

exports.getUserList = async (req, res) => {
  console.log('request',req.body);
  //const payload = req.body;
  const userListTemplate = req.body;
  instance.post('/getUserList', userListTemplate)
  .then(async function (response) {
    //console.log(response);
      res.send(response.data);
  })
  .catch(function (error) {
    // console.log(error);
  });

}

exports.deleteUser = async (req, res) => {
  console.log('request',req.body);
  //const payload = req.body;
  const deleteUserTemplate = req.body;
  instance.post('/deleteUser', deleteUserTemplate)
  .then(async function (response) {
    //console.log(response);
      res.send(response.data);
  })
  .catch(function (error) {
    // console.log(error);
  });

}