var app = require('./index');


module.exports = {
    //GET REQUESTS
    getUsers : function(req,res){
        var db = app.get('db');
        db.users.find(function(err, result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });
    },
    getVehicles : function(req,res){
        var db = app.get('db');
        db.vehicles.find(function(err, result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });

    },
    getVehicleCount : function(req,res){
        var db = app.get('db');
        db.vehicles.count({ownerid: req.params.userId},function(err, result){
            if(!err){ res.status(200).send({count:result});
            } else {  res.status(404).send(err); }            
        });
    },
    getVehiclesByUserId : function(req,res){
        var db = app.get('db');
        db.vehicles.find({ownerid: req.params.userId},function(err,result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });        
    },
    getVehiclesByUserData : function(req,res){
        var db = app.get('db');
        var filter, param;
        if(req.query.email){
            filter = 'email=$1';
            param = [req.query.email];
        }
        if(req.query.userFirstStart){
            filter = 'firstname LIKE $1';
            param = [req.query.userFirstStart+'%'];
        }
        db.users.where(filter, param, function(err1,result1){
            var userArray = [];
            var queryString = 'ownerid IN (';

            result1.forEach(function(item, index){
                userArray.push(item.id);
                queryString = queryString + '$' + (index+1) + ',';
            });

            queryString = queryString.substring(0, queryString.length - 1) + ')';
          
            db.vehicles.where(queryString, userArray, function(err,result){
                if(!err){ res.status(200).send(result);
                } else {  res.status(404).send(err); } 
            });
        });

    },
    getNewerVehiclesByYear : function(req,res){
        var db = app.get('db');
        db.getnewervehiclesbyyear(function(err,result){
            console.log(result);
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); }            
        });
    },

    //POST REQUESTS
    createUser : function(req,res){
        var db = app.get('db');
        db.users.save(req.body, function(err, result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); }            
        });
    },
    createVehicle : function(req,res){
        var db = app.get('db');
        db.vehicles.save(req.body, function(err, result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });
    },
    
    //PUT REQUESTS
    updateVehicleOwnership : function(req,res){
        var db = app.get('db');
        db.vehicles.update({id: req.params.vehicleId}, {ownerid: req.params.userId}, function(err,result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });
    },
    
    //DELETE REQUESTS
    deleteVehicleOwnership : function(req,res){
        var db = app.get('db');
        db.vehicles.update({id: req.params.vehicleId}, {ownerid: null}, function(err,result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });
    },
    deleteVehicle : function(req,res){
        var db = app.get('db');
        db.vehicles.destroy({id: req.params.vehicleId}, function(err,result){
            if(!err){ res.status(200).send(result);
            } else {  res.status(404).send(err); } 
        });
    }
};