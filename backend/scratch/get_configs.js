const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://localhost:27017/mithirashopy";

mongoose.connect(MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const configs = await db.collection('categoryconfigurations').find({}).toArray();
  console.log("CONFIGS IN DB:", JSON.stringify(configs, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
