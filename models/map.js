/* Skin model */
'use strict';

const mongoose = require('mongoose')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const MapSchema = new mongoose.Schema({
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
const Map = mongoose.model('Map', MapSchema)
module.exports = { Map }

