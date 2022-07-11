const User = require('../models/register');

exports.createUser = async (req, res)=>{
  try {
    const user = new User({
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      email: req.body.email,
      password: req.body.password
    });
    await User.create(user)
    res.send({message: 'user saved'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getUsers = async(req, res)=>{
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getUserById = async (req, res)=>{
  try {
    const user = await User.findById(req, params, idUser);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.update = async (req, res)=>{
  try {
    await User.findByIdAndUpdate(req.params.idUser, req.body);
    res.send({message: 'user updated'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteUser = async (req, res)=>{
  try {
    await User.findByIdAndRemove(req.params.idUser);
    res.send({message: 'user deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}