exports.uploadImage = async (req, res) => {
  try {
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
