const File = require('../models/File'); 
const { uploadFile } = require('../config/aws');

exports.upload = async (req, res) => {
  try {
    const result = await uploadFile(req.file.originalname, req.file.buffer); 
    console.log('S3 Upload Result:', result);// Ensure file content is passed correctly
    const file = new File({
      user: req.user.id,
      filename: req.file.originalname,
      url: result.Location,
    });

    await file.save();
    res.status(201).json({ file }); // Use 201 for resource creation
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message }); // More detailed error message
  }
};

exports.list = async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id });
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving files', error: error.message }); // More detailed error message
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Ensure the user deleting the file is the owner
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await file.remove();
    res.json({ message: 'File deleted successfully' }); // More informative success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error.message }); // More detailed error message
  }
};

