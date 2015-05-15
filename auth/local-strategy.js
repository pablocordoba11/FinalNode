var passport = module.parent.exports.passport,
	LocalStrategy = require('passport-local').Strategy,
	Empleado = require('../models/employee.js');

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		done(null,user);
	});
	console.log("ooo")
	passport.use('AdminLogin', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'pass1'
	},
	function(username, password , done){
		console.log("entra function"+ username + password);
		Empleado.findOne({email:username}, function(err, emp){
			if(err) {return done(err);}
			if(!emp){
				return done(null,false,{message :'E-mail no valido'});
			}
			if(!emp.authenticate(password)){
				return done(null,false, {message:'Password incorrecto'});
			}
			return done(null,emp);
		});
	}
));