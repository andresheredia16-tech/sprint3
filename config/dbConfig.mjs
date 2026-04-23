import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://grupo-23:grupo-23@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
    console.log('conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}