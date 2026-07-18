import { getValuesForFilter, setCategoryConfigsCache } from '../../user/src/utils/filterUtils.js';
import fs from 'fs';
import path from 'path';

// Mock localStorage
global.localStorage = {
  getItem: (key) => {
    if (key === 'mithra_category_configurations') {
      return fs.readFileSync(path.join(process.cwd(), 'uploads/category_configurations.json'), 'utf8');
    }
    return null;
  },
  setItem: () => {}
};

const product = {
  name: "Kids Jacquard Classic T-Shirt",
  category: "Clothing > Kids",
  subCategory: "",
  variants: [
    {
      size: "2y",
      color: "navy blue"
    }
  ]
};

// Seeding the memory cache
const configs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'uploads/category_configurations.json'), 'utf8'));
setCategoryConfigsCache(configs);

console.log("VALUES FOR SIZE:", getValuesForFilter(product, 'Size'));
console.log("VALUES FOR AGE:", getValuesForFilter(product, 'Age'));
process.exit(0);
