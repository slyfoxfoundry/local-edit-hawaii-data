const fs = require('fs');

const path = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const imageUpdates = {
  2079: {
    heroImage: 'https://ktasuperstores.com/wp-content/uploads/2025/02/StoreFront_FINAL-1024x683.jpg',
    imageSourceUrl: 'https://ktasuperstores.com/store-locator/',
    imageRights: 'Official business website',
    hours: 'Daily 5:30 AM–10:00 PM',
    phoneNumber: '808-959-9111',
    summary: 'Locally owned Hawaiʻi supermarket serving Hilo from its Puainako store.'
  },
  2155: {
    heroImage: 'https://ktasuperstores.com/wp-content/uploads/2025/08/Updated-Sign-Waimea-1024x742.jpg',
    imageSourceUrl: 'https://ktasuperstores.com/store-locator/',
    imageRights: 'Official business website',
    summary: 'Locally owned Hawaiʻi supermarket serving the Waimea community.'
  },
  2186: {
    heroImage: 'https://acehardwarehawaii.com/cdn/shop/files/hero-banner_74fb279c-1818-4e24-adcd-019245462f93.jpg?v=1782249921&width=1600',
    imageSourceUrl: 'https://acehardwarehawaii.com/',
    imageRights: 'Official business website'
  },
  2201: {
    heroImage: 'https://static.wixstatic.com/media/38f3d8_20436ced52f242019b0f1c03c9b841b9~mv2.jpg/v1/fill/w_425,h_551,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/market%20flyer.jpg',
    imageSourceUrl: 'https://www.okaukakou.org/',
    imageRights: 'Official organization website',
    summary: 'Community farmers and artisans market organized by ʻO Kaʻū Kākou.'
  },
  2210: {
    heroImage: 'https://img1.wsimg.com/isteam/ip/1749feff-20a4-4c09-a002-df2cf33fe744/17ffef79-2767-495c-a80a-271c2fd34a11.jpg',
    imageSourceUrl: 'https://kahukugiftandgardenshop.com/',
    imageRights: 'Official business website',
    phoneNumber: '808-939-9202',
    hours: 'Mon–Sat 9:00 AM–6:00 PM; Sun 9:00 AM–5:00 PM',
    summary: 'Ocean View shop featuring local art, gifts, garden goods, pet supplies and Kaʻū products.'
  },
  2212: {
    heroImage: 'https://acehardwarehawaii.com/cdn/shop/files/long-card_copy.png?v=1785609946&width=1600',
    imageSourceUrl: 'https://acehardwarehawaii.com/',
    imageRights: 'Official business website'
  },
  2229: {
    heroImage: 'https://uluwehicoffeefarm.com/wp-content/uploads/2017/07/antidote-sl34-main.png',
    imageSourceUrl: 'https://uluwehicoffeefarm.com/',
    imageRights: 'Official business website',
    summary: 'Single-estate Kona coffee farm producing award-winning specialty coffee.'
  },
  2247: {
    heroImage: 'https://132082496.cdn6.editmysite.com/uploads/1/3/2/0/132082496/RUSN3FKMYP5P7Q5DGE226DEI.jpeg?width=320&dpr=1',
    imageSourceUrl: 'https://www.oliviaclareboutique.com/',
    imageRights: 'Official business website',
    summary: 'Hawaiʻi boutique featuring island clothing, jewelry, gifts and work from local artisans.'
  },
  2256: {
    heroImage: 'https://132082496.cdn6.editmysite.com/uploads/1/3/2/0/132082496/4OEX7YUER7XOOCI32ZWBEZGY.jpeg?width=320&dpr=1',
    imageSourceUrl: 'https://www.oliviaclareboutique.com/',
    imageRights: 'Official business website',
    summary: 'Kona boutique featuring island clothing, jewelry, gifts and work from local artisans.'
  },
  2287: {
    heroImage: 'https://www.nahoku.com/cdn/shop/files/C1821218_207734_abd0d309-b8c9-46e0-a4ce-fc8bcea5e571.jpg?v=1760049923&width=360',
    imageSourceUrl: 'https://www.nahoku.com/',
    imageRights: 'Official business website',
    summary: 'Hawaiʻi jeweler established in 1924, offering island-inspired fine jewelry.'
  },
  2302: {
    heroImage: 'https://133994948.cdn6.editmysite.com/uploads/1/3/3/9/133994948/SP5M2NL3WKZ4TZ3QZE72CMLT.jpeg?width=320&dpr=1',
    imageSourceUrl: 'https://www.hanahouhilo.com/',
    imageRights: 'Official business website',
    summary: 'Hilo shop perpetuating wearable arts and culture from Hawaiʻi and the Pacific.'
  },
  2312: {
    heroImage: 'https://images.squarespace-cdn.com/content/v1/6542afd16a2bfd098de3fca3/4b729c19-0add-4c49-9b1a-8eed62651d8f/employee-home-hero.png?format=1500w',
    imageSourceUrl: 'https://www.minitstop.com/',
    imageRights: 'Official business website'
  }
};

const taxonomyUpdates = {
  2007: 'Local Foods & Specialty Products',
  2026: 'Surf, Dive & Outdoor',
  2028: 'Jewelry & Accessories',
  2030: 'Clothing & Accessories',
  2077: 'Hardware & Building Supply',
  2116: 'Surf, Dive & Outdoor',
  2276: 'Beauty, Wellness & Pharmacy',
  2339: 'Garden, Farm & Floral',
  2340: 'Garden, Farm & Floral',
  2362: 'Home & Furniture',
  2388: 'Hardware & Building Supply',
  2392: 'Hardware & Building Supply',
  2393: 'Hardware & Building Supply'
};

const coordinateUpdates = {
  2128: { latitude: '19.638258', longitude: '-155.9937826' }
};

const touched = new Set();
for (const item of data.items) {
  if (imageUpdates[item.id]) {
    Object.assign(item, imageUpdates[item.id]);
    item.images = [item.heroImage];
    touched.add(item.id);
  }
  if (taxonomyUpdates[item.id]) {
    item.subcategory = taxonomyUpdates[item.id];
    item.placeType = taxonomyUpdates[item.id];
    touched.add(item.id);
  }
  if (coordinateUpdates[item.id]) {
    Object.assign(item, coordinateUpdates[item.id]);
    touched.add(item.id);
  }
}

const expected = new Set([
  ...Object.keys(imageUpdates),
  ...Object.keys(taxonomyUpdates),
  ...Object.keys(coordinateUpdates)
].map(Number));
if (touched.size !== expected.size) throw new Error(`Expected ${expected.size} records, updated ${touched.size}`);

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Updated ${touched.size} shop records`);
