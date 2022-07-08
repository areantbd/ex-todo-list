const Task = require('../models/task.model')
const mongoose = require('mongoose');
 
mongoose
.connect('mongodb://localhost/todolist')
.then(() => console.info("Connected to DB"))
.catch(() => console.error("Error DB", error))

 /* 
// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
 
// If the connection throws an error
mongoose.connection.on('error', err => console.log(`Mongoose default connection error: ${err}`));
 
// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
 
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}); */