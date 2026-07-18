export const COLOR_MAP = {
  // Base colors
  pink: '#E94FA8',
  red: '#FF0000',
  yellow: '#FFCC00',
  green: '#00CC66',
  purple: '#8A2BE2',
  black: '#000000',
  white: '#FFFFFF',
  blue: '#1565C0',
  navy: '#051838',
  orange: '#FF6600',
  grey: '#808080',
  gray: '#808080',
  brown: '#8B4513',
  gold: '#D4AF37',
  silver: '#C0C0C0',
  beige: '#F5F5DC',
  maroon: '#800000',
  lavender: '#9575CD',
  teal: '#008080',
  coral: '#FF7F50',
  peach: '#FFDAB9',
  cream: '#FFFDD0',
  khaki: '#C8A96E',
  olive: '#808000',
  plum: '#8E44AD',
  sage: '#8FAF8F',
  charcoal: '#36454F',
  magenta: '#FF00FF',
  cyan: '#00CCCC',
  mustard: '#FFDB58',
  violet: '#7F00FF',
  indigo: '#4B0082',
  bronze: '#CD7F32',
  copper: '#B87333',
  rust: '#B7410E',
  turquoise: '#40E0D0',
  apricot: '#FBCEB1',
  rose: '#FF007F',
  wine: '#722F37',
  mint: '#66E0A3',
  aqua: '#00CED1',
  amber: '#FFC107',
  crimson: '#DC143C',
  scarlet: '#FF2400',
  fuchsia: '#FF00FF',
  lime: '#A8CC00',
  emerald: '#50C878',
  sapphire: '#0F52BA',
  ruby: '#E0115F',
  ivory: '#FFFFF0',
  tan: '#D2B48C',
  taupe: '#8B7D7B',
  mauve: '#E0B0FF',
  lilac: '#C8A2C8',
  periwinkle: '#CCCCFF',
  champagne: '#F7E7CE',
  // Multi-word colors
  'sage green': '#8FAF8F',
  'mint green': '#66e0a3',
  'light blue': '#88ccff',
  'light green': '#90EE90',
  'light pink': '#FFB6C1',
  'light grey': '#D3D3D3',
  'light gray': '#D3D3D3',
  'light yellow': '#FFFFE0',
  'light red': '#FF6666',
  'dark blue': '#00008B',
  'dark green': '#006400',
  'dark red': '#8B0000',
  'dark grey': '#424242',
  'dark gray': '#424242',
  'dark brown': '#5C3317',
  'dark purple': '#4A148C',
  'dark pink': '#C71585',
  'sky blue': '#87CEEB',
  'royal blue': '#4169E1',
  'ocean blue': '#1565C0',
  'baby blue': '#89CFF0',
  'powder blue': '#B0E0E6',
  'slate blue': '#6A8195',
  'steel blue': '#4682B4',
  'cobalt blue': '#0047AB',
  'electric blue': '#0892D0',
  'forest green': '#228B22',
  'army green': '#4B5320',
  'grass green': '#7CFC00',
  'jade green': '#00A36C',
  'hot pink': '#FF69B4',
  'soft pink': '#F8BBD0',
  'baby pink': '#F4C2C2',
  'dusty pink': '#DCAE96',
  'blush pink': '#FEC5BB',
  'neon pink': '#FF6EC7',
  'deep purple': '#4A148C',
  'deep blue': '#003366',
  'deep red': '#8B0000',
  'deep green': '#006400',
  'warm red': '#FF4136',
  'cool grey': '#B0BEC5',
  'cool gray': '#B0BEC5',
  'warm grey': '#918070',
  'warm gray': '#918070',
  'pure white': '#FFFFFF',
  'pure black': '#000000',
  'off white': '#FAF9F6',
  'off-white': '#FAF9F6',
  'midnight black': '#111111',
  'midnight blue': '#191970',
  'crimson red': '#DC143C',
  'champagne gold': '#D4AF37',
  'rose gold': '#B76E79',
  'rose pink': '#FF66B3',
  'sunset orange': '#FD5E53',
  'burnt orange': '#CC5500',
  'tangerine': '#F28500',
  'butter yellow': '#FFFD74',
  'lemon yellow': '#FFF44F',
  'golden yellow': '#FFC200',
  'emerald green': '#50C878',
  'bottle green': '#006A4E',
  'pine green': '#01796F',
  'teal blue': '#0097A7',
  'peacock blue': '#005F6B',
  'indigo blue': '#3F51B5',
  'dusty blue': '#7393B3',
  'powder pink': '#FFB7C5',
  'blush': '#FEC5BB',
  'nude': '#E3BC9A',
  'camel': '#C19A6B',
  'sand': '#C2B280',
  'mocha': '#6F4E37',
  'chocolate': '#7B3F00',
  'coffee': '#6F4E37',
  'burgundy': '#800020',
  'bordeaux': '#5C0120',
  'brick red': '#CB4154',
  'terra cotta': '#E2725B',
  'salmon': '#FA8072',
  'cherry': '#DE3163',
  'berry': '#A21A6E',
  'grape': '#6F2DA8',
  'eggplant': '#380835',
  'amethyst': '#9966CC',
  'periwinkle blue': '#7070CC',
  'electric purple': '#BF00FF',
  'neon green': '#39FF14',
  'neon orange': '#FF6700',
  'neon yellow': '#FFFF00',
  'neon blue': '#1F51FF',
  'metallic gold': '#D4AF37',
  'metallic silver': '#C0C0C0',
  'iridescent': '#B8860B',
  // Compound names used by products
  'purple-white': '#b39ddb',
  'yellow-white': '#fff59d',
  'pink-white': '#f8bbd0',
  'green-white': '#a5d6a7',
  'black-white': '#e0e0e0',
  'blue-white': '#5B8DB8',
  'dark grey': '#424242',
  'slate blue': '#6b8195',
  'baby blue': '#bbdefb',
  'cool grey': '#b0bec5',
  'imperial gold': '#D4AF37',
  'silver platinum': '#e0e0e0',
  'pure white': '#ffffff',
};

// CSS-valid color name check: these are built-in CSS color keyword names that browsers understand
const CSS_COLOR_KEYWORDS = new Set([
  'red','blue','green','yellow','orange','purple','pink','black','white','grey','gray',
  'brown','cyan','magenta','lime','navy','teal','olive','maroon','coral','gold','silver',
  'beige','khaki','ivory','plum','violet','indigo','crimson','salmon','turquoise','aqua',
  'lavender','mint','rose','wine','rust','amber','scarlet','fuchsia','tan','mauve'
]);

export const getColorHex = (name) => {
  if (!name) return '#cccccc';
  const key = name.toLowerCase().trim();
  // Check our map first
  if (COLOR_MAP[key]) return COLOR_MAP[key];
  // Check if it's a valid single-word CSS color keyword
  if (CSS_COLOR_KEYWORDS.has(key)) return key;
  // If it looks like a hex already, return it
  if (/^#[0-9a-f]{3,8}$/i.test(key)) return key;
  // Unknown color — return a neutral grey so swatches aren't broken
  return '#cccccc';
};

export const normalizeFilterName = (name) => {
  if (!name) return '';
  const clean = String(name).toLowerCase().trim();
  
  // Brand normalizations
  if (['brand', 'brands', 'brabd', 'brnad', 'banrd'].includes(clean)) {
    return 'Brand';
  }
  // Color normalizations
  if (['color', 'colors', 'colro', 'clor'].includes(clean)) {
    return 'Color';
  }
  // Size normalizations
  if (['size', 'sizes', 'szie', 'szies'].includes(clean)) {
    return 'Size';
  }
  // Age normalizations
  if (['age', 'ages', 'age group', 'agegroup'].includes(clean)) {
    return 'Age';
  }
  // Fabric normalizations
  if (['fabric', 'fabrics', 'fabirc', 'fabiric'].includes(clean)) {
    return 'fabric';
  }
  // Gender normalizations
  if (['gender', 'genders', 'gedner'].includes(clean)) {
    return 'gender';
  }
  
  // Default: Return capitalized nicely
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const normalizeSize = (size, isAge = false) => {
  if (!size) return '';
  const clean = String(size).trim();
  
  if (isAge) {
    const digitsMatch = clean.match(/^(\d+)/);
    if (digitsMatch) {
      return `${digitsMatch[1]}Y`;
    }
  }
  
  // Match age patterns: e.g. "4y", "4 y", "4yr", "4 yrs", "4 years", "4 year"
  const ageMatch = clean.match(/^(\d+)\s*(?:y|Y|yr|yrs|year|years)s?$/i);
  if (ageMatch) {
    return `${ageMatch[1]}Y`; // Standardize to uppercase Y: "4Y"
  }
  
  // Standardize clothing standard sizes to uppercase: "m" -> "M", "l" -> "L", "xl" -> "XL"
  const upper = clean.toUpperCase();
  if (['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '3XL', '4XL'].includes(upper)) {
    return upper;
  }
  
  return clean;
};

export const getValuesForFilter = (product, filterName) => {
  if (!product || !filterName) return [];
  const nameNorm = normalizeFilterName(filterName).toLowerCase().trim();
  const nameLower = nameNorm;

  const cleanValues = (val) => {
    if (val === undefined || val === null) return [];
    const raw = Array.isArray(val)
      ? val.map(v => String(v).trim()).filter(Boolean)
      : [String(val).trim()].filter(Boolean);
      
    const isAge = nameLower === 'age' || nameLower === 'ages';
    if (nameLower === 'size' || nameLower === 'sizes' || isAge) {
      return raw.map(v => normalizeSize(v, isAge));
    }
    return raw;
  };

  // 1. Direct property check
  for (const key of Object.keys(product)) {
    if (normalizeFilterName(key).toLowerCase() === nameNorm) {
      const val = product[key];
      if (val !== undefined && val !== null) {
        return cleanValues(val);
      }
    }
  }

  // Camelcase fallback, e.g., "Neck Type" -> "neckType"
  const camelKey = filterName.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
  if (product[camelKey] !== undefined && product[camelKey] !== null) {
    return cleanValues(product[camelKey]);
  }

  // 2. product.attributes
  if (product.attributes && typeof product.attributes === 'object') {
    for (const key of Object.keys(product.attributes)) {
      if (normalizeFilterName(key).toLowerCase() === nameNorm) {
        return cleanValues(product.attributes[key]);
      }
    }
    if (product.attributes[camelKey] !== undefined && product.attributes[camelKey] !== null) {
      return cleanValues(product.attributes[camelKey]);
    }
  }

  // 3. product.specifications
  if (product.specifications && typeof product.specifications === 'object') {
    for (const key of Object.keys(product.specifications)) {
      if (normalizeFilterName(key).toLowerCase() === nameNorm) {
        return cleanValues(product.specifications[key]);
      }
    }
  }
  if (Array.isArray(product.specifications)) {
    for (const spec of product.specifications) {
      if (spec && spec.name && normalizeFilterName(spec.name).toLowerCase() === nameNorm) {
        return cleanValues(spec.value);
      }
    }
  }

  // 4. Variant check
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    const values = new Set();
    
    let colorVarName = '';
    let sizeVarName = '';
    let extraVarNames = [];
    
    try {
      const cached = localStorage.getItem('mithra_category_configurations');
      if (cached) {
        const configs = JSON.parse(cached);
        const prodCat = String(product.category || '').toUpperCase().trim();
        const prodSub = String(product.subCategory || '').toUpperCase().trim();
        
        let activeCfg = null;
        if (prodSub) {
          activeCfg = Object.values(configs).find(cfg => {
            if (!cfg || !cfg.categoryName) return false;
            const nameNormVal = cfg.categoryName.toUpperCase().trim();
            return nameNormVal === prodSub || prodSub.includes(nameNormVal);
          });
        }
        if (!activeCfg && prodCat) {
          activeCfg = Object.values(configs).find(cfg => {
            if (!cfg || !cfg.categoryName) return false;
            const nameNormVal = cfg.categoryName.toUpperCase().trim();
            return nameNormVal === prodCat || prodCat.includes(nameNormVal);
          });
        }
        
        if (activeCfg && Array.isArray(activeCfg.variants)) {
          const varNames = activeCfg.variants;
          if (varNames[0]) colorVarName = varNames[0].toLowerCase().trim();
          if (varNames[1]) sizeVarName = varNames[1].toLowerCase().trim();
          if (varNames.length > 2) {
            extraVarNames = varNames.slice(2).map(n => n.toLowerCase().trim());
          }
        }
      }
    } catch (e) {
      console.warn("Failed to resolve dynamic variants mapping:", e);
    }

    for (const variant of product.variants) {
      if (variant && typeof variant === 'object') {
        let matched = false;
        // A. Dynamic map check using Category Configuration index
        if (colorVarName && normalizeFilterName(nameLower).toLowerCase() === normalizeFilterName(colorVarName).toLowerCase()) {
          const val = variant.color || variant[colorVarName];
          if (val) values.add(String(val).trim());
          matched = true;
        }
        else if (sizeVarName && normalizeFilterName(nameLower).toLowerCase() === normalizeFilterName(sizeVarName).toLowerCase()) {
          const val = variant.size || variant[sizeVarName];
          if (val) values.add(String(val).trim());
          matched = true;
        }
        else if (extraVarNames.some(ev => normalizeFilterName(ev).toLowerCase() === normalizeFilterName(nameLower).toLowerCase())) {
          if (variant.sku && variant.sku.includes('||')) {
            try {
              const [, jsonStr] = variant.sku.split('||');
              const meta = JSON.parse(jsonStr);
              const extra = meta.extraVariants || {};
              const foundKey = Object.keys(extra).find(k => normalizeFilterName(k).toLowerCase() === normalizeFilterName(nameLower).toLowerCase());
              if (foundKey && extra[foundKey]) {
                values.add(String(extra[foundKey]).trim());
              }
            } catch (_) {}
          }
          matched = true;
        }
        
        // B. Fallback to direct key matching ONLY if it wasn't mapped differently
        if (!matched) {
          const isQuerySize = normalizeFilterName(nameLower).toLowerCase() === 'size';
          const isSizeMappedElsewhere = sizeVarName && normalizeFilterName(sizeVarName).toLowerCase() !== 'size';
          
          const isQueryColor = normalizeFilterName(nameLower).toLowerCase() === 'color';
          const isColorMappedElsewhere = colorVarName && normalizeFilterName(colorVarName).toLowerCase() !== 'color';

          for (const key of Object.keys(variant)) {
            const keyNorm = normalizeFilterName(key).toLowerCase();
            if (keyNorm === nameNorm) {
              if (keyNorm === 'size' && isQuerySize && isSizeMappedElsewhere) continue;
              if (keyNorm === 'color' && isQueryColor && isColorMappedElsewhere) continue;

              const val = variant[key];
              if (val) values.add(String(val).trim());
            }
          }
        }
        
        if (variant.attributes && typeof variant.attributes === 'object') {
          for (const key of Object.keys(variant.attributes)) {
            if (normalizeFilterName(key).toLowerCase() === nameNorm) {
              const val = variant.attributes[key];
              if (val) values.add(String(val).trim());
            }
          }
        }
      }
    }

    if (values.size > 0) {
      return cleanValues(Array.from(values));
    }
  }

  return [];
};

export const getFilterOptions = (categoryProducts, filterName) => {
  const options = new Set();
  for (const product of categoryProducts) {
    const vals = getValuesForFilter(product, filterName);
    for (const val of vals) {
      options.add(val);
    }
  }
  return Array.from(options).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
};

export const applyDynamicFilters = (products, activeFilters) => {
  let filtered = products;
  Object.entries(activeFilters).forEach(([filterName, selectedValues]) => {
    if (selectedValues && selectedValues.length > 0) {
      filtered = filtered.filter(p => {
        const productValues = getValuesForFilter(p, filterName).map(v => v.toUpperCase());
        return selectedValues.some(val => productValues.includes(val.toUpperCase()));
      });
    }
  });
  return filtered;
};

export const getProductBadge = (product, discountPercentage) => {
  if (!product) return null;
  const badgeStr = product.badge ? String(product.badge).toUpperCase().trim() : '';
  const isNew = !!(product.isNewArrival || badgeStr === 'NEW' || badgeStr === 'NEW ARRIVAL' || String(product.id).startsWith('n'));
  const isOffer = !!(product.isOffer || badgeStr.includes('OFFER') || badgeStr.includes('DEAL') || discountPercentage > 0);
  
  if (isNew) {
    return { type: 'NEW', text: 'NEW' };
  } else if (isOffer) {
    if (discountPercentage > 0) {
      return { type: 'DISCOUNT', text: `${discountPercentage}% OFF` };
    }
    if (product.badge) {
      return { type: 'DISCOUNT', text: product.badge };
    }
    return { type: 'DISCOUNT', text: 'OFFER' };
  }
  return null;
};

/**
 * Given the full configs object (keyed by category name), an activeTab, an activeSubTab,
 * and the list of selected sidebar subcategories + the DB categories list,
 * resolves and merges filter names from the most-specific to least-specific config,
 * case-insensitively, without duplicates.
 *
 * Returns an array of filter name strings (excluding "Price").
 */
export const getMergedFiltersForPath = (configs, activeTab, activeSubTab, selectedSubcategories, categoriesList) => {
  const safeConfigs = configs || {};
  const safeSubs = selectedSubcategories || [];
  const safeCats = categoriesList || [];

  // Recursive helper to get all descendant subcategories under a parent category
  const getDescendants = (parentName) => {
    const list = [];
    const directChildren = safeCats.filter(c => c.parent && c.parent.toUpperCase().trim() === parentName.toUpperCase().trim());
    directChildren.forEach(child => {
      list.push(child);
      list.push(...getDescendants(child.name));
    });
    return list;
  };

  // --- Build list of category paths to resolve ---
  const activePaths = [];

  const tabNorm = (activeTab || '').trim().toUpperCase();
  const subNorm = (activeSubTab || '').trim().toUpperCase();

  if (tabNorm && tabNorm !== 'ALL') {
    if (subNorm && subNorm !== 'ALL') {
      // Navigated to a specific subcategory tab
      activePaths.push(`${tabNorm} > ${subNorm}`);
    } else if (safeSubs.length > 0) {
      // Sidebar subcategory checkboxes selected
      safeSubs.forEach(sub => {
        const dbCat = safeCats.find(c => c.name.toUpperCase() === sub.toUpperCase());
        if (dbCat && dbCat.parent && dbCat.parent !== '—') {
          activePaths.push(`${dbCat.parent.toUpperCase()} > ${sub.toUpperCase()}`);
        } else {
          activePaths.push(`${tabNorm} > ${sub.toUpperCase()}`);
        }
      });
    } else {
      // Just the parent category tab — include parent + all its descendant subcategories' configs
      const descendants = getDescendants(tabNorm);
      descendants.forEach(c => {
        let current = c;
        const pathSegments = [current.name.toUpperCase().trim()];
        while (current && current.parent && current.parent !== '—') {
          pathSegments.unshift(current.parent.toUpperCase().trim());
          const nextParent = safeCats.find(cat => cat.name.toUpperCase().trim() === current.parent.toUpperCase().trim());
          if (!nextParent || nextParent === current) break;
          current = nextParent;
        }
        activePaths.push(pathSegments.join(' > '));
      });
      activePaths.push(tabNorm);
    }
  } else {
    if (safeSubs.length > 0) {
      safeSubs.forEach(sub => {
        const dbCat = safeCats.find(c => c.name.toUpperCase() === sub.toUpperCase());
        if (dbCat && dbCat.parent && dbCat.parent !== '—') {
          activePaths.push(`${dbCat.parent.toUpperCase()} > ${sub.toUpperCase()}`);
        } else {
          activePaths.push(sub.toUpperCase());
        }
      });
    }
  }

  // If no specific path, return all filter names from all configs
  if (activePaths.length === 0) {
    const allFilters = [];
    const seen = new Set();
    Object.values(safeConfigs).forEach(cfg => {
      if (cfg && cfg.filters) {
        cfg.filters.forEach(f => {
          if (f && typeof f === 'string') {
            const norm = normalizeFilterName(f);
            if (norm.toLowerCase() === 'price') return;
            const normLower = norm.toLowerCase();
            if (!seen.has(normLower)) {
              seen.add(normLower);
              allFilters.push(norm);
            }
          }
        });
      }
    });
    return allFilters;
  }

  // --- For each path, find matching config keys and merge filters ---
  const mergedFilters = [];
  const seen = new Set();

  /**
   * Find a config key that matches a single segment name (case-insensitive).
   * Exact match is preferred over substring match.
   */
  const findConfigKey = (segmentName) => {
    const lower = segmentName.toLowerCase();
    // Exact match first
    let key = Object.keys(safeConfigs).find(k => k.toLowerCase() === lower);
    if (key) return key;
    // Substring match (e.g. "kids" matches "Kids Clothing")
    key = Object.keys(safeConfigs).find(k =>
      k.toLowerCase().includes(lower) || lower.includes(k.toLowerCase())
    );
    return key || null;
  };

  const addFilters = (filterList) => {
    if (!filterList || !Array.isArray(filterList)) return;
    filterList.forEach(f => {
      if (f && typeof f === 'string') {
        const norm = normalizeFilterName(f);
        if (norm.toLowerCase() === 'price') return;
        const normLower = norm.toLowerCase();
        if (!seen.has(normLower)) {
          seen.add(normLower);
          mergedFilters.push(norm);
        }
      }
    });
  };

  activePaths.forEach(path => {
    const segments = path.split('>').map(s => s.trim());
    // Process most-specific (rightmost/subcategory) first, then parent
    const reversedSegments = [...segments].reverse();
    reversedSegments.forEach(segment => {
      const key = findConfigKey(segment);
      if (key && safeConfigs[key]) {
        addFilters(safeConfigs[key].filters);
      }
    });
  });

  return mergedFilters;
};

