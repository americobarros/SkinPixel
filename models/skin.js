/* Skin model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const SkinSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	}, 
	username: {
		type: String,
		minlength: 1,
		trim: true,
		unique: true,
	}, 
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	name: {
		type: String,
		trim: true,
		default: ""
	},
	bio: {
		type: String,
		trim: true,
		default: ""
	},
	createdAt: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
        default: false
	}
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
SkinSchema.pre('save', function(next) {
	const skin = this; // binds this to Skin document instance

	// checks to ensure we don't hash password more than once
	if (skin.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(skin.password, salt, (err, hash) => {
				skin.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
SkinSchema.statics.findByEmailPassword = function(email, password) {
	const Skin = this // binds this to the User model

	// First find the user by their email
	return Skin.findOne({ email: email }).then((skin) => {

		if (!skin) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, skin.password, (err, result) => {
				if (result) {
					resolve(skin)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const Skin = mongoose.model('Skin', SkinSchema)
module.exports = { Skin }

