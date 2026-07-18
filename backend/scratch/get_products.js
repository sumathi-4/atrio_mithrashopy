const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://localhost:27017/mithirashopy";

mongoose.connect(MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const products = await db.collection('products').find({}).toArray();
  console.log("PRODUCTS IN DB:", products.map(p => ({
    title: p.title,
    category: p.category,
    subCategory: p.subCategory,
    variants: (p.variants || []).map(v => Object.keys(v))
  })));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
