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
	function(username, password , done){
		console.log("entra function"+ username + password);
		Empleado.findOne({email:username}, function(err, emp){
			console.log(emp, err, 'SA')
			if(err) {return done(err);}
			if(!emp){
				return done(null,false,{message :'E-mail no valido'});
			}
			if(!emp.authenticate(password)){
				return done(null,false, {message:'Password incorrecto'});
			}
			return done(null,emp);
			console.log(emp);
		});
	}
));