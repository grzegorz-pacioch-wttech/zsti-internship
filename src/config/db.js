const mongoose = require('mongoose');
const User = require('../models/user');

require('dotenv').config();

mongoose.connect(process.env.DB_URL, {dbName: 'kanban'})
.then(() => console.log('[Server] Connected to the database'))
// .catch(err => console.log(err));

module.exports = mongoose.connection;