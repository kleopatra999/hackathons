/* 
In step 5 we had the /items post route. Note that we only do the insert, not the select which 
will be eventually required in the application. Try using RETURNING INTO in the next step
*/

var oracledb = require('oracledb');
var dbConfig = require('../dbconfig')
module.exports = function(app){

app.get('/items', function(req, res){

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
	      "select * from items order by item_post_date desc",
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
	        res.json(result);
		})
	}) //end oracledb.getConnection

}); //end app.get(/items)


app.post('/item', function(req, res, next) {

    oracledb.getConnection({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
    	},
    	function(err, connection) {
        	if (err) {
            	console.error(err.message);
            	return;
    	}

        connection.execute(
            'INSERT INTO items (item_title,item_desc,item_posted_by,item_status,item_price) ' +
            'values (:p1,:p2,:p3,:p4,:p5) ',

            {
                p1: req.body.p1,
                p2: req.body.p2,
                p3: req.body.p3,
                p4: req.body.p4,
                p5: req.body.p5
            },

            {
                autoCommit: true
            },

            function(err, status) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                } 

                console.log('record inserted')
                connection.release(function(err) {console.log('error is',err)});
                res.sendStatus(200)


           }); //----- end connection.execute(insert)                    

        }); //------end oracledb.getConnection

}); //-----end app.post new item  


function doRelease(connection){
   connection.release(function(err){
          console.log(err)
        })
};  //end doRelease

} //end module.exports

