const Company = require('../models/company');
const bcrypt = require('bcryptjs');
const randomString = require('randomstring');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./sendEmail');
const Token = require('../models/token');

exports.signup = async (req, res) => {
  try {
    const companyFound = await Company.findOne({ email: req.body.email })
    if (companyFound) {
      return res.send({ message: 'the email is already in use' });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      await Company.create(req.body);
      res.json({ message: 'Company created' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || 'some error occured'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const companyFound = await Company.findOne({ email: req.body.email });
    if (!companyFound) {
      return res.status(401).send({ message: 'Mail or password is invalid' });
    }
    const valid = bcrypt.compare(req.body.password, companyFound.password)
    if (!valid) {
      return res.status(401).send({ message: 'Mail or password is invalid' })
    }
    res.status(200).send({
      message: {
        companyId: companyFound._id,
        token: jwt.sign(
          { companyId: companyFound._id }, process.env.SECRET_KEY,
          { expiresIn: '1d' }
        )
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}



exports.forgotPassword = async (req, res) => {
  try {
    const companyFound = await Company.findOne({ email: req.body.email });
    if (!companyFound) {
      res.status(404).send({ message: 'Company does not exist' });
    }
    let token = await Token.findOne({ companyId: companyFound._id })
    if (token) {
      await token.deleteOne();
    }
    const resetToken = randomString.generate(30)

    await new Token({
      companyId: companyFound._id,
      token: resetToken,
    }).save();

    const link = `${process.env.companyURL}/resetPassword?token=${resetToken}&id=${companyFound._id}`;
    await sendEmail(req.body.email, "Password Reset Request", { companyName: companyFound.companyName, link: link, }, "../template/forgotPassword.html")
    res.json({ message: 'email sent' })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }

}



exports.resetPassword = async (req, res) => {
  try {
    const passwordResetToken = await Token.findOne({token: req.params.resetToken});
  if (!passwordResetToken) {
    res.status(400).json('Invalid or expired password reset token');
  }
  const dateNow = new Date();
  const tokenDate = new Date(passwordResetToken.createdAt);
  const diff = dateNow - tokenDate;
  const seconds = Math.floor( diff/1000);

  if (seconds>900) {
    res.status(400).json('Invalid or expired password reset token');
  }
    let salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await Company.updateOne(
      { _id: passwordResetToken.companyId },
      { $set: { password: hash } },
      { new: true }
    );
    const company = await Company.findById( passwordResetToken.companyId );
    await sendEmail(
      company.email, "Password Reset Successfully",
      {
        companyName: company.companyName,
      }, "../template/resetPassword.html"
    );
    await passwordResetToken.deleteOne();
    res.json({message: 'Password reset'});
  
 
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
  
}