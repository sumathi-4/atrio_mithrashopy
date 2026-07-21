fetch('http://localhost:5000/api/categories/configurations')
  .then(res => res.json())
  .then(data => {
    console.log("RESPONSE FROM API:", JSON.stringify(data, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
