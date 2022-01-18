const router = require('express').Router();
let Exercise = require('../models/exercise');
const jwt = require("jsonwebtoken");


// Returns the details kept in the token, in this case, username.
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    console.log(req.headers);

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        return res.status(403).json("You are not authenticated to access this page.");
    }
}

router.get("/", (req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
})

router.get("/:id", (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", checkToken, (req, res) => {
    jwt.verify(req.token, 'secret-token', async (err, authorizedData) => {
        if (err) { 
            return res.status(403).json("Something went wrong when verifying your token.")
        } else {
            let exercise = await Exercise.findById(req.params.id);
            
            if (exercise.username !== authorizedData.username) {
                return res.status(403).json("You cannot delete another user's log!");
            }

            Exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json("Exercise deleted."))
            .catch((err) => res.status(400).json("Error: " + err));
        }
    })
});

router.post("/:id/update", checkToken, (req, res) => {
    jwt.verify(req.token, 'secret-token', (err, authorizedData) => {
        if (err) { 
            return res.status(403).json("Something went wrong when verifying your token.")
        } else {
            let exercise = Exercise.findById(req.params.id);
            if (exercise.username !== authorizedData.username) {
                return res.status(403).json("You cannot edit another user's log!");
            }

            Exercise.findByIdAndUpdate(req.params.id)
            .then(exercise => {
                // exercise.username = req.body.username ? req.body.username : exercise.username;
                exercise.description = req.body.description ? req.body.description : exercise.description;
                exercise.duration = req.body.duration ? Number(req.body.duration) : exercise.duration;
                exercise.date = req.body.date ? Date.parse(req.body.date) : exercise.date;
        
                exercise.save()
                .then(() => res.json("Exercise updated!"))
                .catch(err => res.status(400).json("Error: " + err));
            }).catch(err => res.status(400).json("Error: " + err));
        }
    })
});

router.post("/create", checkToken, (req, res) => {
    jwt.verify(req.token, 'secret-token', (err, authorizedData) => {
        if (err) { 
            return res.status(403).json("Something went wrong when verifying your token.")
        } else {
            const username = req.body.username;
            const description = req.body.description;
            const duration = Number(req.body.duration);
            const date = Date.parse(req.body.date);
            const dateFormatted = new Date(date).toLocaleDateString();

            const newExercise = new Exercise({
                username, description, duration, date
            });

            newExercise.save()
            .then(exercise => res.json(`Exercise ${description} on ${dateFormatted} by ${username} added!`))
            .catch((err) => res.status(400).json("Error: " + err));
        }
    })
})

module.exports = router;