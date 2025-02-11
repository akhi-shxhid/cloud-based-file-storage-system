// const mongoose = require('mongoose');
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;



const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // No need for useNewUrlParser and useUnifiedTopology in newer versions
    await mongoose.connect('mongodb+srv://SachinIsMyname:H5sxtN4a1DK8Vjwd@cluster0.bcc2j.mongodb.net/MyfirstDatabase?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
