  8 // Setup connection for MongoDB
  9 var url = 'mongodb://localhost:27017/db_wimm';
 10 var dbConn;
 11 require('mongodb').MongoClient.connect(
 12     url,
 13     {poolSize : 5},
 14     function(err,   db) {
 15       if (err == null) {
 16         console.log("Connected successfully to db");
 17         dbConn = db;
 18         console.log(dbConn);
 19 
 20         // Setup logger for MongoDB
 21         require('mongodb').Logger.setLevel("info");
 22       } else {
 23         console.error(err);
 24       }
 25     }
 26 );
