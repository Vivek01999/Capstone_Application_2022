
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


// Get any user's details
exports.getUserDetails = (req, res) => {
  let url = "/getAssets";

  instance.get(url)
  .then(response => {
    console.log(response.data);
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
};
