var qs = require('querystring');
const {MongoClient} = require('mongodb');
var http = require('http');
var url = require('url');

http.createServer(async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var qobj = url.parse(req.url, true).query;
    var username = qobj.username;  

    const uri = "mongodb+srv://wetune:darkchoco@finalproj.4qieest.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    let results = [];

    try {
        await client.connect();

        let database = client.db("weTune");
        let collection = database.collection("posts");

            try {
                results = await collection.find({PostedBy:qobj.username}).forEach(function(post) {
                    res.write("Name: " + post.PostedBy + "\n");
                    res.write("Caption: " + post.Caption + "\n");
                })
        
            } catch (e) {
                console.error(e);
            }
    } finally {
        await client.close();
    }
    res.end();
}).listen(8080);