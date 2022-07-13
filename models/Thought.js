const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
    {
    thought: { 
        type: String, 
        required: true,
        maxLength: 280,
    },

    createdAt: { 
        type: Date, 
        default: Date.now,
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


thoughtsSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

const Thought = model("Thought", thoughtsSchema);

module.exports = Thought;