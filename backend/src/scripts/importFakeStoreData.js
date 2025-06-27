





// server/scripts/importFakeStoreData.js
 import mongoose from 'mongoose';
import axios from 'axios';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    console.log('✅ MongoDB connected');

    const { data } = await axios.get('https://fakestoreapi.com/products');
    
    // Remove the 'id' field from each product to let MongoDB generate _id
    const productsToInsert = data.map(product => {
      const { id, title, ...rest } = product;
      return { name: title, quantity: 1, ...rest }; // Map title to name and add a default quantity
    });

    // Optional: Clear old data
    await Product.deleteMany({});
    
    // Insert new data
    await Product.insertMany(productsToInsert);
    
    console.log('✅ Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error.message);
    process.exit(1);
  }
}

importData();
