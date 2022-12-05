var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var qobj = url.parse(req.url, true).query;
    var username = qobj.username;
    var password = qobj.password;
    main(username, password, res);
}).listen(8080);

function main(user, pass, res) 
{
    const url2 = "mongodb+srv://wetune:darkchoco@finalproj.4qieest.mongodb.net/?retryWrites=true&w=majority";
    MongoClient.connect(url2, {useUnifiedTopology:true}, function(err, db) {
        if (err) { 
            console.log("Connection err: " + err); 
            return;
        }

        var dbo = db.db("login");
        var collection = dbo.collection('login');

        userfind = {username: user};
        passfind = {password: pass};
        console.log(userfind);
        console.log(passfind);
        collection.find(userfind).toArray(function (err, items) {
            if (err) { 
                console.log("Connection err: " + err); 
                return;
            }
            
            console.log("Found user");
        });

        collection.find(passfind).toArray(function (err, items) {
            if (err) { 
                console.log("Connection err: " + err); 
                return;
            }

            console.log("Password matches user");
        });
    });
}