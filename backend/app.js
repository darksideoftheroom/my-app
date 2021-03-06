
var Datastore = require('nedb'), 
db = new Datastore();  

var express = require('express');
var cors = require('cors');
const { errorComparator } = require('tslint/lib/verify/lintError');
const { consoleTestResultHandler } = require('tslint/lib/test');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/signup', function(req, res){
const registerData = req.body;
var person = {
    username: registerData.username,
    password: registerData.password,
    points: 0
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


db.update({type: "highscoreList", username: highscoreData.username}, {type: "highscoreList", username: highscoreData.username, points: highscoreData.points}, {upsert: true}, function(err, newScore, ad,up){
        
    console.log(ad);
    console.log(up);
    console.log(err);
    console.log(newScore);
    });
}); 



app.get('/gethighscore', function(req, res) {
let scorearray = { }
db.find({type: 'highscoreList'}).sort({points: -1}).limit(10).exec(function (err, docs) {
    console.log(docs);
    console.log(err);

    res.status(200).json({
    message: docs
  });     
 });

});
/*  app.post('/getuserhighscore', function(req, res){
    const userData = req.body;
    console.log(userData.username);
db.find({}, function(err,docs){
    docs.forEach(doc => {
        if(userData.username == doc.username){
            res.status(200).json({
                message: doc
              }); 
        }    
        });
    });
});  */


app.post('/login', function(req, res){
const loginData = req.body;

db.find({}, function(err,docs){
    let loggedIn = false;
    docs.forEach(doc => {
        if(loginData.username == doc.username && loginData.password == doc.password){
             //generating a random token for the user
            var token = randomToken();
            console.log(token);
            const tokenData = {
                username: loginData.username,
                token: token
            };

            db.insert(tokenData, function(err, newDoc) {

            });

            //sends the token to the client
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
    token = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
     }

    return token;
   }
});



module.exports = app;