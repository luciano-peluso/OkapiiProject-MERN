const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Conectado: ' + conn.connection.host);
    } catch (error) {
        console.error('Error: '+ error.message);
        process.exit(1); // Process code 1, significa que sale con falla, 0 con éxito
    }
}

module.exports = connectDB;