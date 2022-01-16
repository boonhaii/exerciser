const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

require('dotenv').config();

router.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
})


router.post('/create', async (req, res, next) => {
    // Check for existing users with same username.
    let existingUsername = await User.find({"username": req.body.username});
    let existingEmail = await User.find({"email": req.body.email});
    if (existingUsername.length > 0 ) {
        return res.status(400).json("Username is already in use. Please try another username.");
    }

    if (existingEmail.length > 0 ) {
        return res.status(400).json("Email is already in use. Please log in with the respective account.");
    }

    // Validate Username.
    if (req.body.username.length < 3) {
        return res.status(400).json("Username must be at least 3 characters long.")
    }

    // Validate Passwords.
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json("Passwords do not match.");
    } 

    bcrypt.hash(req.body.password, 5, (err, hashed) => {
        if (err) {
            return next(err);
        }

        const username = req.body.username;
        const email = req.body.email;
        const newUser = new User({username: username, password: hashed, email: email});;
        
        newUser.save()
        .then(() => res.json(`User ${username} added!`))
        .catch((err) => {
            console.log("Error: " + err);
            return res.status(400).json("There was an issue creating the new user.")
        });
    })
    
    

    
})

module.exports = router;