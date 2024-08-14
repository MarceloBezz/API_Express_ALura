import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
    //Senha pessoal protegida
    mongoose.connect(process.env.DB_CONNECTION_STRING)
    return mongoose.connection;
};

export default conectaNaDatabase;