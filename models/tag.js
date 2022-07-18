const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String, 
    required: [true, 'Description is required']
  }
},
{
  versionKey: false,
  timestamps: true
});

const Tag = mongoose.model('tag', TagSchema);
module.exports = Tag;
