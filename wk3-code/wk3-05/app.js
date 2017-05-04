var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

//Handle our Requests
app.get('/', function (req, res) {
    // this is where its reading the json file of the data
    fs.readFile(__dirname + "/data/users.json", 'utf8', function (err, data) {
        console.log(data);
        res.render(
            'index', {
                users: data
            });
    });
});

//Start our server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
