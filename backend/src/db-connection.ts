import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Muat file .env
dotenv.config();

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }
    // Hubungkan ke MongoDB tanpa opsi tambahan
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Keluar jika koneksi gagal
  }
};

export default connectToDatabase;
