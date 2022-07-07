//Is this meant to be part of the thought model and not it's own model?


const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        //TODO: Add timestamps
    },
    },

    {
    toJSON: {
        getters: true,
    },
        _id: false,
    }
);

const Reaction = model("reaction", reactionSchema);

module.exports = reactionSchema;

