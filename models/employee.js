var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto= require('crypto');

var employeeSchema = new Schema({
	nombre: String,
	apellido: String,
	email: String,
	pass1: String,
	pass2: String

});
employeeSchema.pre("save",function(next){
	if(this.isModified('pass1'))
		this.pass1 = crypto.createHash('md5').update(this.pass1).digest("hex");
	next();
});
// metodo de autenticacion
employeeSchema.method('authenticate',function(pass1){
	return crypto.createHash('md5').update(pass1).digest("hex") === this.pass1;
});

var employeeModel = mongoose.model('Employee',employeeSchema);

module.exports = employeeModel;