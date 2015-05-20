var passport = module.parent.exports.passport,
	LocalStrategy = require('passport-local').Strategy,
	Empleado = require('../models/employee.js');

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		done(null,user);
	});
	passport.use('AdminLogin', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'pass1'
	},
	function(email, pass1 , done){
		console.log("entra function: "+ email + " Password: " + pass1);
		//Problemas con el findOne
		Empleado.findOne({email:email}, function(err, emp){
			console.log(emp, err, 'SA');
			if(err) {return done(err);}
			if(!emp){
				return done(null,false,{message :'E-mail no valido'});
			}
			if(!emp.authenticate(pass1)){
				return done(null,false, {message:'Password incorrecto'});
			}
			return done(null,emp);
			console.log(emp);
		});
	}
));