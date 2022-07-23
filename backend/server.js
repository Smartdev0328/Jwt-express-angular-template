
var express = require('express');

var app = express();
const cors=require('cors');
app.use(express.json());
app.use(cors());
require('../backend/router/router')(app);
 
const db = require('./config/db.config');
 
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
   console.log('Drop and Resync with { force: true }');
 });
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})
 
 