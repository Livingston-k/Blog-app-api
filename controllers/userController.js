const models = require('../models')
const Validator = require("fastest-validator");
const v = new Validator();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

// MODELS
const User = models.User

// CREATE USER
const signUp = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
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
    User.findOne({ where: { 'email': req.body.email } }).then((data) => {
        if (data) {
            res.status(409).send({ 'msg': 'User with this email already exists' })
        } else {
            User.create(user).then((data) => {
                res.status(200).send({ 'msg': 'User created successfully', 'user': data })
            }).catch((err) => {
                res.status(500).send({ 'msg': 'Error creating user', 'error': err })
            })
        }
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error finding user', 'error': err })
    })
}

// LOGIN USER
const Login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const schema = {
        email: { type: "string", max: 1000 },
        password: { type: "string" }
    };
    const validation = v.validate(user, schema)
    if (validation != true) {
        return res.status(400).send(validation)
    }

    User.findOne({ where: { email: req.body.email } }).then((data) => {
        if (data === null) {
            return res.status(404).send({ 'msg': 'Invalid creditials' })
        }
        const comparepwd = bcrypt.compareSync(req.body.password, data.password);
        if (comparepwd) {
            const token = jwt.sign({
                email: data.email,
                user_id: data.id,
            }, process.env.JWT_SECRETE, (err, token) => {
                return res.status(200).send({
                    'msg': 'User Authentication successfull',
                    'token': token
                })
            })
        } else {
            return res.status(404).send({ 'msg': 'Invalid creditials' })
        }

    })
}

module.exports = {
    signUp,
    Login
}