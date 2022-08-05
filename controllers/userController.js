const models = require('../models')
const Validator = require("fastest-validator");
const v = new Validator();
var bcrypt = require('bcryptjs');

// MODELS
const User = models.User

// CREATE USER
const signUp = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash
    }
    const schema = {
        name: { type: "string", optional: false, max: 300 },
        email: { type: "string", max: 1000 },
        password: { type: "string" }
    };
    const validation = v.validate(user, schema)
    if (validation != true) {
        return res.status(400).send(validation)
    }
    User.create(user).then((data) => {
        res.status(200).send({ 'msg': 'User created successfully' })
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error creating user', 'error': err })
    })
}

module.exports = {
    signUp
}