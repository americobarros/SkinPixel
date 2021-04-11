/* Skin model */
'use strict';

const mongoose = require('mongoose')
const { UserSchema } = require("./user");

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const ResourceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
	createdAt: {
		type: String,
		required: true
	},
    image: {
        // file path
        type: String,
        required: true
    },
    file: {
        // file path
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
	user: {
		type: [UserSchema],
        required: true
    },
    comments: {
        type: Array,
        default: ""
    }
})

// make a model using the User schema
const Resource = mongoose.model('Resource', ResourceSchema)
module.exports = { Resource }

