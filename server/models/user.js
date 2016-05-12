var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	name: String,
	password: String,
	email: String
});

UserSchema.pre('save', function(next) {

	var self = this;

	if (!self.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(self.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}

			self.password = hash;
			next();
		});
	});

});

UserSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}

		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', UserSchema, 'users');