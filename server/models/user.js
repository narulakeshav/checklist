var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	password: String,
	email: String
});

UserSchema.methods.comparePassword = function(password) {
	return (password === this.password);
}

module.exports = mongoose.model('User', UserSchema, 'users');