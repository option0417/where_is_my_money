// Setup connection for MongoDB
module.exports = {
  connectToDB : function() {
    var url = 'mongodb://localhost:27017/db_wimm';
    var dbConn;
    require('mongodb').MongoClient.connect(
        url,
        {poolSize : 5},
        function(err,   db) {
          if (err == null) {
            console.log("Connected successfully to db");
            dbConn = db;
            console.log(dbConn);
        
            // Setup logger for MongoDB
            require('mongodb').Logger.setLevel("info");
          } else {
            console.error(err);
          }
        }
    );
    return dbConn;
  }
}
