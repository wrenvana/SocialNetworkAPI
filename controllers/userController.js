const { Thought, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

// const userCount = async () =>
//     User.aggregate()
//     .count("userCount")
//     .then((numberOfUsers) => numberOfUsers);

module.exports = {
    //Get all users
getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
    },

    //Get one user by id
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this name." })
        : res.json(user)
        )
    .catch((err) => res.status(500).json(err));
    },

  //Create user
createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
    },

    //Delete user by id
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this name." })
        : res.json(user)
        )
    .catch((err) => res.status(500).json(err));
    },

    //Update user by id
updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
    .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this name." })
        : res.json(user)
        )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    },

  // Add friend
addFriend(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
    )
    .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this name." })
        : res.json(user)
        )
    .catch((err) => res.status(500).json(err));
    },

  // Delete friend
deleteFriend(req, res) {
    User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
    )
    .then((user) =>
        !user
        ? res.status(404).json({ message: "No user found with this name." })
        : res.json({ message: "Friend deleted." })
    )
    .catch((err) => res.status(500).json(err));
    },
};