const Tag = require('../models/tag');

exports.createTag = async (req, res) => {
  try {
    const tag = {
      title: req.body.title,
      description: req.body.description
    }
    await Tag.create(tag)
    res.send({ message: 'Tag created' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.idTag)
    res.send(tag);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.update = async (req, res) => {
  try {
    await Tag.findByIdAndUpdate(req.params.idTag, req.body)
    res.send({ message: 'Tag updated' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteTag = async (req, res) => {
  try {
    await Tag.findByIdAndRemove(req.params.idTag)
    res.send({ message: 'Tag deleted' })
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}
