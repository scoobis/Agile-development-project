
var mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'mariadb',
  user: 'root',
  password: 'root123',
  database: 'dbtest',
  connectionLimit: 50
});

//From https://dev.to/probablyrealrob/getting-started-with-mariadb-using-docker-and-node-js-3djg
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  } 