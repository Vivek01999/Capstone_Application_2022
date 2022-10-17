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