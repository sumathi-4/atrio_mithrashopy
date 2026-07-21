require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const categories = await db.collection('categories').find({}).toArray();
  console.log("CATEGORIES IN DB:", categories.map(c => ({
    name: c.name,
    parent: c.parent,
    slug: c.slug
  })));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
