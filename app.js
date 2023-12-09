const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  app.use('/auth', authRoutes);
  
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });


mongoose.connect('mongodb+srv://aryakhochare:6KUqMMpbGEyDhs0o@cluster0.eerc5uv.mongodb.net/?retryWrites=true&w=majority').then(() => {
    app.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
}).catch(err => {
    console.log(err);
});

