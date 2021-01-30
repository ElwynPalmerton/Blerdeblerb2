const mongoose = require('mongoose');



// const dbURI = 'mongodb://localhost:27017/social'
const dbURI = process.env.MONGODB_URI

const db = mongoose.connect(dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(msg => console.log('Connected to mongoose'))
  .catch(e => console.log(e));

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}); 
