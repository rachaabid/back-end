const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');

const CompanySchema = new Schema({
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
    },
    role: {
      type: String,
      default:'Admin',
      required: [true, 'Role is required']
    },
    photo: {
      type: String,
      default: path.resolve('/avatar.png'),
    }
},
{
  versionKey: false,
  timestamps: true
});


const Company = mongoose.model('company', CompanySchema);
module.exports = Company;