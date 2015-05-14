var empleado = require('../models/employee');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finalnode');

var e = new empleado ({ nombre:"Pablo",apellido:"codoba",email:"as",pass1:"dsa",pass2:"ads"});
	e.save(function(err,doc){
		console.log(err,doc);
	}); 	