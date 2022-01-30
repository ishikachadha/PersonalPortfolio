var express = require("express");
var app = express();
var port = 80;
const path = require("path");
var bodyParser = require('body-parser');
const pug = require("pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/info");
var infoSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    message: String
});
var Info = mongoose.model("Info", infoSchema);

app.get('/', (req, res)=>{
    // const params = {}
    res.status(200).render('index.pug');
})

app.get('/home', (req, res)=>{
    // const params = {}
    res.status(200).render('home.pug');
})

app.post("/home", (req, res) => {
    var myData = new Info(req.body);
    myData.save()
        .then(item => {
            res.send("Your information has been saved to the database");
        })
        .catch(err => {
            res.status(400).send("Unable to save the information to the database");
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});