const { Schema, model } = require("mongoose");
const thoughtsSchema = require('./Thought');

const validEmail = function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
    return true;
    }
    alert("Please submit a valid email address.");
    return false;
}

const userSchema = new Schema(
{
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    validate: [validEmail],
    },
    thoughts:[
    { type: Schema.Types.ObjectId, 
        ref: 'Thought' 
    }],
    friends: [
    { type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    toJSON: {
    virtuals: true,
    },
}
);

userSchema.virtual("friendCount")
    .get(function () {
    return this.friends.length;
    });

const User = model("user", userSchema);

module.exports = User;
