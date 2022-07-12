const User = require('../models/register');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res)=>{
  try {
    const userFound = await User.findOne({email: req.body.email})
    console.log(userFound);
    if (userFound){
      return res.send({message: 'the email is already in use'});
    }
   else {
    const salt=10;
    const hash =  bcrypt.hashSync(req.body.password, salt);
    req.body.password=hash;
    User.create(req.body);
    res.json({message: 'user created'});
   }
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured'
    });
  }
};

exports.login = async(req, res)=>{
  try {
    const userFound = await User.findOne({email: req.body.email});
    if(!userFound){
      return res.status(401).send({message: 'Mail or password is invalid'});
    }
    const valid = bcrypt.compare(req.body.password, userFound.password)
    if (!valid){
      return res.status(401).send({message: 'Mail or password is invalid'})
    }
    res.status(200).send({message: {
      userId: userFound._id,
      token: jwt.sign(
        {userId: userFound._id}, process.env.SECRET_KEY,
        {expiresIn: '7d'}
      )
    }});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}