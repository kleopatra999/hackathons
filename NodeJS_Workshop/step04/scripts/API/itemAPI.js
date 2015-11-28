/* We define a new route /items. First thing we need to do when this route is hit is get a connection, 
then we fire the sql and finally convert the data to the format our application can consume 
*/
'use strict';

var oracledb = require('oracledb')
var dbConfig = require('../dbconfig')
module.exports = function(app){

  app.get('/item', function(req, res){

console.log('/items api called')

oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection)
  {
    if (err) {
    	console.log('could not get connection')
      console.error(err.message);
      return;
    }
    connection.execute(
      "select * from items",
      {},
      {outFormat: oracledb.OBJECT},
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection)
          return;
        }

        console.log('sql executed')
        console.log(result.rows);
        doRelease(connection)
        res.json(result.rows[1]);
})




      }) //end oracledb.getConnection

function doRelease(connection){
	 connection.release(function(err){
        	console.log('error is',err)
        })
};  //end doRelease


  });

} //end module.exports

