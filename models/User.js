const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: {
      
    },
    friends: {
      
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model('user', usersSchema);

module.exports = User;
