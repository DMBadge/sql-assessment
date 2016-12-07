var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connString = "postgres://postgres:12345@localhost/assessbox";

var app = module.exports = express();
var api = require('./api');


app.use(bodyParser.json());
app.use(cors());


var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
    
    db.user_create_seed(function(){
      console.log("User Table Init");
    });

    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init");
    });
    
});



app.get('/api/users', api.getUsers);
app.get('/api/vehicles', api.getVehicles);
app.get('/api/user/:userId/vehiclecount', api.getVehicleCount);
app.get('/api/user/:userId/vehicle', api.getVehiclesByUserId);
app.get('/api/vehicle/', api.getVehiclesByUserData);
app.get('/api/newervehiclesbyyear', api.getNewerVehiclesByYear);

app.post('/api/users', api.createUser);
app.post('/api/vehicles', api.createVehicle);

app.put('/api/vehicle/:vehicleId/user/:userId', api.updateVehicleOwnership);

app.delete('/api/user/:userId/vehicle/:vehicleId', api.deleteVehicleOwnership);
app.delete('/api/vehicle/:vehicleId', api.deleteVehicle);


app.listen('3000', function(){
  console.log("Successfully listening on : 3000");
});


