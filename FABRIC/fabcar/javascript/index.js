const app = require("express")();
const cors = require("cors");
const bodyParser = require('body-parser')
const port = 3002
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const { enrollAdmin, registerUser, deleteUser, getUserList, updateFabricUser } = require("./childProcess");


app.get('/', (req, res) => {
    res.send("success");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})

app.post('/enrollAdmin', cors(), enrollAdmin);
app.post('/registerUser', cors(), registerUser);
app.post('/deleteUser',cors(), deleteUser);
app.post('/getUserList', cors(), getUserList);
app.post('/updateFabricUser', cors(), updateFabricUser);

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close((err) => {
        console.log('Http server closed.');
        process.exit(err ? 1 : 0);
    });
});