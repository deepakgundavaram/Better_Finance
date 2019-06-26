const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Joi = require("joi");
const {User, LogInValidation} = require("../models/user");


//this is the route for the user to login
router.post("/", async(req,res) => {

    //if it does not make the validator then send a error message
    const {error} = LogInValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //else find the email in the database and compare the password
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Wrong Email / Password");
    
    
    const password = await bcrypt.compare(req.body.password,user.password);
    if(!password) return res.status(400).send("Wrong Email / Password");

    const token = user.generateToken();
    // res.json({token:token})
    res.header('x-auth-token', token).send("The user has been verified");
})


module.exports = router;
