const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  companyName: {
    type: String,
    required: [true, 'Company Name is required']
  },
    companyDescription: {
      type: String,
      required: [true, 'Company Description is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
},
{
  versionKey: false,
  timestamps: true
});

const User = mongoose.model('user', UserSchema);
module.exports = User;