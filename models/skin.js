/* Skin model */
'use strict';

const mongoose = require('mongoose')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const SkinSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    skin2D: {
        type: Array,
        required: true
    },
	username: {
		type: String,
        required: true
    },
    comments: {
        type: Array,
        default: ""
    }
})

// make a model using the User schema
const Skin = mongoose.model('Skin', SkinSchema)
module.exports = { Skin }

