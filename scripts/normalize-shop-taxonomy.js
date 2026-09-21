const fs = require("fs");

const path = "shop-discovery.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));

function classify(value) {
  const s = value.toLowerCase();

  if (/shopping center|marketplace|department store|warehouse|general retail|discount|variety/.test(s)) return "Shopping Centers & General Retail";
  if (/farmer|artisan market|community market/.test(s)) return "Farmers Markets";
  if (/antique|vintage|thrift|secondhand|consignment|resale|reuse|pawn/.test(s)) return "Antiques, Vintage & Thrift";
  if (/art|gallery|photography|studio/.test(s)) return "Art & Galleries";
  if (/jewel|rock|mineral|crystal/.test(s)) return "Jewelry & Accessories";
  if (/apparel|clothing|footwear|boutique|formalwear|western|hat|bag|resort wear|skate|eyewear/.test(s)) return "Clothing & Accessories";
  if (/surf|dive|paddle|fishing|outdoor|sporting|bicycle|surplus/.test(s)) return "Surf, Dive & Outdoor";
  if (/fabric|quilt|craft|hobby|toy|game/.test(s)) return "Fabric, Crafts & Hobby";
  if (/book|music|record|media|vinyl|coin|collectible/.test(s)) return "Books, Music & Collectibles";
  if (/furniture|home|mattress/.test(s)) return "Home & Furniture";
  if (/hardware|building|lumber/.test(s)) return "Hardware & Building Supply";
  if (/florist|lei|nursery|plant|garden|farm \/ feed|farm \/ garden|growing/.test(s)) return "Garden, Farm & Floral";
  if (/pet/.test(s)) return "Pet Supplies";
  if (/beauty|wellness|pharmacy|health|body care|supplement|metaphysical/.test(s)) return "Beauty, Wellness & Pharmacy";
  if (/electronic|mobile/.test(s)) return "Electronics & Mobile";
  if (/grocery|natural food|convenience|general store|country store/.test(s)) return "Groceries & General Stores";
  if (/coffee|chocolate|candy|specialty food|local food|farm product|farmstand|tea|preserve|organic/.test(s)) return "Local Foods & Specialty Products";
  if (/gift|local good|hawaiian good|hawaiʻi gift|lauhala|specialty retail|wedding|custom good|design/.test(s)) return "Gifts & Local Goods";

  throw new Error(`Unmapped shop type: ${value}`);
}

const counts = {};
for (const item of data.items) {
  const canonical = classify(item.subcategory || item.placeType || "");
  item.subcategory = canonical;
  item.placeType = canonical;
  counts[canonical] = (counts[canonical] || 0) + 1;
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log(JSON.stringify(counts, null, 2));
