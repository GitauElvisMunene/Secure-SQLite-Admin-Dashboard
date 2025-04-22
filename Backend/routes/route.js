const express = require("express")
const router = express.Router()
const User = require("../models/user")
const userSchema = require("../schemas/user")



//Register a new user

router.post('/register', (req, res) => {
    const {error} = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    User.create(req.body, (err)=>{
        if (err) return res.status(500).send("Error creating user.");
        res.send("User registered successfully");
    });
});





//login a user
router.post('/login', (req, res)=>{
    const {username, password} = req.body;

    User.authenticate(username, password, (err,user)=>{
        if (err || !user) res.status(401).send("Invalid credentials.");
        res.send("Login Successful!");
    });
});


module.exports = router