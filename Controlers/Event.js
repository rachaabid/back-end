const Event = require('../models/event');
const Tag = require('../models/tag')
const Company = require('../models/company')

exports.createEvent = async (req, res) => {
  try {
    if(req.body.photo == ''){
      req.body.photo = 'https://i.imgur.com/I65uxQr.png'
    }
    const event = await Event.create(req.body)
    await Company.findByIdAndUpdate(req.user._id, {$push: {events: event._id}}, {new: true});

    res.send({ message: 'Event created' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('tags');
    res.send(events);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}


exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.idEvent)
    res.send(event);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.update = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.idEvent, req.body)
    res.send({ message: 'Event updated' })
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteEvent = async (req, res) => {
  try {
    await Company.findByIdAndUpdate(req.user._id, {$pull: {events: req.params.idEvent}}, {new: true});
    await Event.findByIdAndRemove(req.params.idEvent)
    res.send({ message: 'Event deleted' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getTagsForEvents = async (req, res)=>{
  try {
    const tags = await Tag.find();
    listTags = []
    tags.map(tag=>{
     listTags.push({label: tag.title, value: tag._id})
    })
    res.send(listTags);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.uploadImageEvent = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file)
    if(req.file != undefined){
      res.send({message: 'file uploaded successfully'});
    }
    else {
      res.status(400).send({message:'file not uploaded'})
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured while uploaded'
    });
  }
}
