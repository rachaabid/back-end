const Company = require('../models/company');
const Event = require('../models/event')
const bcrypt = require('bcryptjs');
const { findById } = require('../models/company');

exports.createCompany = async (req, res) => {
  try {
    if(req.body.photo == ''){
      req.body.photo = 'https://i.imgur.com/I65uxQr.png'
    }
    const companyFound = await Company.findOne({ email: req.body.email })
    if (companyFound) {
      return res.status(400).send({ message: 'the email is already in use' });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      await Company.create(req.body);
      res.json({ message: 'Company created' });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getCompanies = async (req, res)=>{
  try {
   const companies = await Company.find();
   res.send(companies);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.getCompanyById = async (req, res)=>{
  try {
    const company = await Company.findById(req.params.idCompany).populate('events');
    res.send(company);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.update = async (req, res)=>{
  try {
   await Company.findByIdAndUpdate(req.params.idCompany, req.body);
    res.send({message: 'Company updated'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteCompany = async (req, res)=>{
  try {
    const company = await Company.findById(req.params.idCompany);
    company.events.map(async (id)=>{
      await Event.findByIdAndRemove(id)
    })
    await Company.findByIdAndRemove(req.params.idCompany)
    res.send({message: 'Company deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.uploadImageCompany = async (req, res) => {
  try {
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