const fs = require('fs');

const dataRaw = fs.readFileSync('./src/data/products.json', 'utf8');
const products = JSON.parse(dataRaw);

products.forEach(p => {
  // Convert price to realistic INR (roughly * 83) and round to ending in 99
  const baseInr = p.price * 83;
  p.price = Math.round(baseInr / 100) * 100 - 1; 

  // Add realistic varied discount between 10% and 50%
  // e.g., if price is 2499, compareAtPrice might be 3999
  const discountFactor = 0.10 + Math.random() * 0.40;
  const compareAt = p.price / (1 - discountFactor);
  p.compareAtPrice = Math.round(compareAt / 100) * 100 - 1;
});

fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
console.log('Prices successfully updated to INR with randomized cut-prices.');
