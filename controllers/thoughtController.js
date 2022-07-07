const { Thought, User } = require("../models");

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
    },
    //Get one thought by id
    getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought with this ID." })
        : res.json(thought)
        )
    .catch((err) => res.status(500).json(err));
    },
    //Create thought
    createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        res.json(thought);
        return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought } },
        { new: true }
        );
        })
    .then((user) =>
        !user
        ? res.status(404).json({message: "No user found with this name.",})
        : res.json("New thought added.")
        )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },
    //Delete thought by id
    deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID." })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
            )
        )
    .then((user) =>
        !user
        ? res.status(404).json({message: "No user found.",})
        : res.json({ message: "Thought erased." }))
    .catch((err) => res.status(500).json(err));
    },
        //Update thought by id
    updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, 
        { $set: req.body }
        )
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID." })
        : res.json(thought)
        )
        .catch((err) =>
        res.status(500).json(err));
    },


//Add reaction to thought
addReaction(req, res) {
    console.log(req.body);
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this ID." })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },


//Remove reaction from thought
removeReaction(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No reaction found." })
        : res.json({ message: "Reaction erased." })
        )
    .catch((err) => res.status(500).json(err));
    },
};
