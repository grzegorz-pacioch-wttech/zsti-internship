const mongoose = require('mongoose');
const User = require('../models/user');

require('dotenv').config();

mongoose.connect(process.env.db_url, {dbName: 'kanban'})
.then(() => console.log('connected to the database'))
// .catch(err => console.log(err));

module.exports = mongoose.connection;