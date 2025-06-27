





// server/scripts/importFakeStoreData.js
 import mongoose from 'mongoose';
import axios from 'axios';
import Product from '../models/Product.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    console.log('✅ MongoDB connected');

    const usersData = [
      { username: "Sanka", email: "kalindu47kk@gmail.com", password: "12345678" },
      { username: "Sanka47", email: "sanka@gmail.com", password: "12345678" },
      { username: "Kavisha", email: "kavisha@gmail.com", password: "12345678" },
    ];

    const createdUsers = [];
    for (const userData of usersData) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        user = await User.create({ ...userData, password: hashedPassword });
        console.log(`User ${user.username} created.`);
      } else {
        console.log(`User ${user.username} already exists.`);
      }
      createdUsers.push(user);
    }

    if (createdUsers.length === 0) {
      console.error('No users available to assign products. Exiting.');
      process.exit(1);
    }

    const userIds = createdUsers.map(user => user._id);
    let userIndex = 0;

    const { data } = await axios.get('https://fakestoreapi.com/products');
    
    // Remove the 'id' field from each product to let MongoDB generate _id and assign a user
    const productsToInsert = data.map(product => {
      const { id, title, ...rest } = product;
      const assignedUser = userIds[userIndex];
      userIndex = (userIndex + 1) % userIds.length; // Cycle through users
      return { name: title, quantity: 1, user: assignedUser, ...rest }; // Map title to name, add quantity and user
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
