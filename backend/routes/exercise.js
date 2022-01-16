const router = require('express').Router();
let Exercise = require('../models/exercise');

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

router.delete("/:id", (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/:id/update", (req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username ? req.body.username : exercise.username;
        exercise.description = req.body.description ? req.body.description : exercise.description;
        exercise.duration = req.body.duration ? Number(req.body.duration) : exercise.duration;
        exercise.date = req.body.date ? Date.parse(req.body.date) : exercise.date;

        exercise.save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    }).catch(err => res.status(400).json("Error: " + err));
});

router.post("/create", (req, res) => {
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
})

module.exports = router;