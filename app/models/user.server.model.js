var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		index: true,
		match: [/.+\@.+\..+/, 'Invalid email']
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username can\'t be blank'
	},
	password: {
		type: String,
		validate: [
			function(password){
				return password.length >= 6
			},
			'Password should have 6 or more characters'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		require: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	}
})

UserSchema.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName
}).set(function(fullName){
	var splitName = fullName.split(' ')
	this.firstName = splitName[0] || ''
	this.lastName = splitName[1] || ''
})

UserSchema.set('toJSON', { getters: true, virtuals: true })

mongoose.model('User', UserSchema)