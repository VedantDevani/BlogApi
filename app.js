const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./blog');
const blogRoutes = require('./routes/blogRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');


// Set your MongoDB URI here
const MONGO_URI = 'mongodb://localhost:27017/Blog';

const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Mongo")
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`)
    })
  }).catch((error) => {
    console.log(error)
  });

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', blogRoutes);

app.use(errorMiddleware);
