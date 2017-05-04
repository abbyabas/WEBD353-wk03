var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
//Handle our Requests
app.get('/', function (req, res) {
    fs.readFile(__dirname + "/data/users.json", 'utf8', function (err, data) {
        console.log(data);
        res.render('index', {
            users: data
        });
    });
});
app.get('/addDog', function (req, res) {
    res.render('add', {
        title: "Add A Dog"
    });
});
app.post('/', function (req, res) {
    //Below you can see from the console.log what was submitted via the form.
    console.log(req.body); //all the input fields
    console.log(req.body.name); // specific information
    console.log(req.body.breed);
    console.log(req.body.age);
    console.log(req.body.owner);
    console.log(req.body.img);
    console.log(req.body);
    req.body.img = "/images/doggo.gif";
    console.log(req.body);
    // Go to the homepage and render a success alert.
    res.send({message: 'Got the Dog from the form!'});
});
//Start our server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
