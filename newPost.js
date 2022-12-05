var http = require('http');
var url = require('url');
var mongo = require('mongodb').MongoClient;
var moment = require('moment-timezone');
const { time } = require('console');
moment().tz("America/Los_Angeles");

http.createServer(async function (req, res) {
        var queryObj = url.parse(req.url, true).query;
        await storeToDb(queryObj);
        res.writeHead(308, { /* redirect to next page */
                Location: 'http://127.0.0.1:5500/weTune/feed.html'
        }).end();
}).listen(8080);

/* store form data to db */
async function storeToDb(queryObj)
{
        var connectUrl = "mongodb+srv://wetune:darkchoco@finalproj.4qieest.mongodb.net/?retryWrites=true&w=majority";
        var client = new mongo(connectUrl, { useUnifiedTopology: true });
        try {
                /* establish connection with database */
                await client.connect();
                /* get collection */
                var database = await client.db("weTune");
                var collection = await database.collection("posts");
                /* create new document for current post */
                var newDoc = {"PostedBy": 1, "Caption": queryObj.caption, "Date": getTime(), "SongID": queryObj.trackID, "Likes": 0};
                console.log(newDoc);
                await collection.insertOne(newDoc, function(err) {
                        if(err) throw err;
                });
        } catch (error) {
                console.log(error);
        } finally {
                await client.close();
        }
}

function getTime() {
        currTime = new Date;
	minutes = currTime.getMinutes();
	ampm = currTime.getHours() >= 12 ? ' PM' : ' AM';
        hour = currTime.getHours();
        if (hour > 12) {
                hour -= 12;
        } else if (hour == 0) {
                hour = 12
        }
	currTime = currTime.getMonth() + "/" + currTime.getDate() + "/" + 
        currTime.getFullYear() + " at " + hour + ":" +
		        (minutes >= 10 ? minutes : "0" + minutes) + ampm;
        return currTime;
}