const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/teamRoutes');

require('dotenv').config();

mongoose.connect(process.env.DEFAULT_CONNECTION, { useNewUrlParser: true })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log('Error occured', err))

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Server running at port ${port}...`));

module.exports = app;