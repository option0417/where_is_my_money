// Setup connection for MongoDB
var dbConn;
module.exports = {
  connectToDB : function() {
    var url = 'mongodb://localhost:27017/db_wimm';
    require('mongodb').MongoClient.connect(
        url,
        {poolSize : 5},
        function(err,   db) {
          if (err == null) {
            console.log("Connected successfully to db");
            dbConn = db;
        
            // Setup logger for MongoDB
            require('mongodb').Logger.setLevel("info");
          } else {
            console.error(err);
          }
        }
    );
  },
  getDBConn : function() {  return dbConn;  }
}
