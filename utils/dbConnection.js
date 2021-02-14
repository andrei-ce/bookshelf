const mongoose = require('mongoose');
const config = require('config');
const CONNECTION_STRING = config.get('MONGO_URI');

const connectDb = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const disconnectDb = function () {
  try {
    return mongoose.disconnect();
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = {
  connectDb,
  disconnectDb,
};
