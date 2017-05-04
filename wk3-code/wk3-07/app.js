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
    console.log(req.body);
    console.log(req.body.name);
    req.body.img = "/images/doggo.gif";
    fs.readFile(__dirname + "/data/users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        data = JSON.stringify(data);
        fs.writeFile(__dirname + "/data/users.json", data, function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            res.render('index', {
                users: data
                , success: "Your Dog Was Added to the List"
            });
            console.log("The file was saved!");
        });
    });
});
//Start our server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
