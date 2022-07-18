const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TokenSchema = new Schema({
  companyId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
  
},
{ versionKey: false,
  timestamps : true
});
module.exports = mongoose.model("Token", TokenSchema);