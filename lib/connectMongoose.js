const mongoose = require('mongoose');

mongoose.connection.on('error', err=>{
    console.log('Error de conexión', err);
});

mongoose.connection.once('open', ()=>{
    console.log('Concetado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1:27017/dbadds');

module.exports = mongoose.connection;