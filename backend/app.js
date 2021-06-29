
var Datastore = require('nedb'), 
db = new Datastore();  

var express = require('express');
var cors = require('cors');
const { errorComparator } = require('tslint/lib/verify/lintError');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/signup', function(req, res){
const registerData = req.body;
var person = {
    username: registerData.username,
    password: registerData.password
};
person.username = req.body.username;
person.password = req.body.password;

db.find({}, function(err,docs){
    let exists = false;
    docs.forEach(doc => {
        if(registerData.username === doc.username){
                console.log("Exists")
                res.status(200).json({ //eigentlich 409
                    message: 'user exists'
                });
            exists = true;
        }
    });
if(!exists){
db.insert(person, function(err, newPerson){
    console.log(err);
});

res.status(200).json({ 
    message: 'registered'
});

}});
});

app.get('/', function(req, res){
res.send('hello world');
});

app.post('/highscore', function(req, res){
const highscoreData = req.body;
console.log(req.body);
var highscore = {
    type: 'highscoreList',
    username: highscoreData.username,
    points: highscoreData.points
};
highscoreData.points = req.body.points;
db.insert(highscore, function(err, newScore){
    console.log(err);
});
});

app.get('/gethighscore', function(req, res) {
let scorearray = { }
db.find({type: 'highscoreList'}, function (err, docs) {
    docs.forEach(doc => { 
    scorearray = docs;

    }); 
    res.status(200).json({
        message: scorearray
    });    
    });

});

app.post('/logout', function(req, res){
docs.forEach(doc => {
    if(loginData.username == doc.username){
        var token = randomToken();
        token ="";
        console.log(token);
        const tokenData = {
            username: loginData.username,
            token: token
        };
        db.insert(tokenData, function(err, newDoc) {
        });
    }    
    });
});

app.post('/login', function(req, res){
const loginData = req.body;

db.find({}, function(err,docs){
    let loggedIn = false;
    docs.forEach(doc => {
        if(loginData.username == doc.username && loginData.password == doc.password){
             //Um einen Token zu generieren
            var token = randomToken();
            console.log(token);
            const tokenData = {
                username: loginData.username,
                token: token
            };

            db.insert(tokenData, function(err, newDoc) {

            });

            //Schicke den Token an den Client
            res.status(200).json({
                message: 'Successful login'
            });
            loggedIn = true;
        }
    });


    if (!loggedIn) {
        res.status(200).json({  //eigentlich 401
            message: 'Login failed'
        });
    }
});
function randomToken(){
    let token;
    token = "adj29uej"
    return token;
   }
});



module.exports = app;