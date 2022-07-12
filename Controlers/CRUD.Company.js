const Company = require('../models/company');

exports.createCompany = async (req, res) => {
  try {
    const company = {
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      photo: req.body.photo
    }
    await Company.create(company);
    res.send({message: 'Company created'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.getCompanys = async (req, res)=>{
  try {
   const companys = await Company.find();
   res.send(companys);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.getCompanyById = async (req, res)=>{
  try {
    const company = await Company.findById(req.params.idCompany)
    res.send(company);
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}

exports.update = async (req, res)=>{
  try {
    await Company.findByIdAndUpdate(req.params.idCompany)
    res.send({message: 'Company updated'});
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    });
  }
}

exports.deleteCompany = async (req, res)=>{
  try {
    await Company.findByIdAndRemove(req.params.idCompany)
    res.send({message: 'Company deleted'})
  } catch (error) {
    res.status(500).send({
      message: error.message || 'some error occured'
    }); 
  }
}