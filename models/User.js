const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    email: {
        unique: true,
        require: true,
        type: String
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

//validating the correct input
function validateSignUp(input) {
    const schema = {
        name: Joi.string().required(),
        password: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().required(),
    }
    return Joi.validate(input, schema);
}

function validateLogin(input) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(100).required()
    }
    return Joi.validate(input, schema)
}

//enclosed logic in the module for creating a token for login / signup
//the this is from this schema id
schema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, config.get('jwtPrivateKey'));
    return token;
}

exports.User = mongoose.model("users", schema);
exports.SignUpValidation = validateSignUp;
exports.LogInValidation = validateLogin;