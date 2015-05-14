var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	nombre: String,
	apellido: String,
	email: String,
	pass1: String,
	pass2: String

});
var employeeModel = mongoose.model('Employee',employeeSchema);

module.exports = employeeModel;