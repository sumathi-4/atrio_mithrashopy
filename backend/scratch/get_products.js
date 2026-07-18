require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const products = await db.collection('products').find({}).toArray();
  console.log("ALL PRODUCTS IN DB:");
  products.forEach(p => {
    console.log(`- name: "${p.name || p.title}", category: "${p.category}", subCategory: "${p.subCategory}", sizes in variants:`, p.variants?.map(v => v.size));
  });
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
