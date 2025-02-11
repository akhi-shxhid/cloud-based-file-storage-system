const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (fileName, fileContent) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };
  
  try {
    const data = await s3.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:', data);
    return data;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};

module.exports = { uploadFile };
