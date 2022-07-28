const Company = require('../models/company');

exports.createCompany = async (req, res) => {
  try {
    await Company.create(req.body);
    res.send({message: 'Company created'})
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
    await Company.findByIdAndUpdate(req.params.idCompany, req.body)
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