var empleado = require('../models/employee');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finalnode');

var e = new empleado ({ nombre:"Ignacio",apellido:"Preda",email:"nacho",pass1:"dsa",foto:"ads"});
	e.save(function(err,doc){
		console.log(err,doc);
	}); 	