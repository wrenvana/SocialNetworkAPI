const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
});

//TODO: Populate users and thoughts - do I need an array for reactions?
const users = [];
const thoughts = [];

await Thought.collection.insertMany(thoughts);
    thoughts.forEach((thought) => {
    users.forEach((user) => {
    if (thought.username === user.username) {
        user.thoughts.push(thought._id);
    }
    });
});


await User.collection.insertMany(users);