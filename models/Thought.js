const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema({
    thoughtText: { 
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 280,
    },

    createdAt: { 
        type: String, 
        default: Date.now,
        //TODO: Add timestamps
    },

    username:{ 
        type: String, 
        required: true 
    },

    reactions:[reactionSchema]
    },
    {
        toJSON: {
        virtuals: true,
        },
        id: false,
    }
);


thoughtsSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model("thought", thoughtSchema);

module.exports = thoughtsSchema;