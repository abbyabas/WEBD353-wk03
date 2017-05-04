var express = require('express');
var app = express();
var path = require('path');
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(path.join(__dirname, 'public')));

//Handle our Requests
app.get('/', function (req, res) {

    res.render(
        'index', {
            name: "YaBoi Puggie",
            title: "Pugs are my best friend",
            url: "http://pugjs.org"
        });
});

//Start our server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})