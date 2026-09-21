const fs = require('fs');

const file = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const nationalChainIds = new Set([
  2001, 2005, 2009, 2013, 2014, 2018, 2020, 2021, 2022,
  2032, 2035, 2036, 2040, 2041, 2042, 2074, 2078, 2082,
]);

const duplicateMerges = new Map([
  [2055, 2372],
  [2083, 2377],
  [2084, 2302],
  [2086, 2334],
  [2342, 2111],
  [2284, 2343],
  [2286, 2344],
  [2347, 2102],
  [2330, 2352],
  [2294, 2396],
  [2268, 2412],
  [2410, 2124],
  [2400, 2110],
]);

const byId = new Map(data.items.map((item) => [item.id, item]));
for (const [removeId, keepId] of duplicateMerges) {
  const source = byId.get(removeId);
  const target = byId.get(keepId);
  if (!source || !target) throw new Error(`Missing duplicate pair ${removeId}/${keepId}`);
  for (const field of ['address', 'phoneNumber', 'latitude', 'longitude', 'website']) {
    if (!target[field] && source[field]) target[field] = source[field];
  }
}

const removeIds = new Set([...nationalChainIds, ...duplicateMerges.keys()]);
data.items = data.items.filter((item) => !removeIds.has(item.id));

const official = new Map([
  [2079, { phoneNumber: '808-959-9111', hours: 'Daily 5:30 AM–10:00 PM', website: 'https://ktasuperstores.com/store-locator/' }],
  [2080, { phoneNumber: '808-959-5831', hours: 'Daily 6:00 AM–10:00 PM', website: 'https://foodland.com/store-locations/' }],
  [2155, { phoneNumber: '808-885-8866', hours: 'Daily 6:00 AM–8:00 PM', website: 'https://ktasuperstores.com/store-locator/' }],
  [2158, { phoneNumber: '808-885-2022', hours: 'Daily 6:00 AM–9:00 PM', website: 'https://foodland.com/store-locations/' }],
  [2184, { phoneNumber: '808-966-9316', hours: 'Daily 6:00 AM–9:00 PM', website: 'https://foodland.com/store-locations/' }],
  [2235, { phoneNumber: '808-322-2311', hours: 'Daily 7:00 AM–8:00 PM', website: 'https://ktasuperstores.com/store-locator/' }],
  [2239, { phoneNumber: '808-883-1088', hours: 'Daily 6:00 AM–8:00 PM', website: 'https://ktasuperstores.com/store-locator/' }],
  [2251, { phoneNumber: '808-887-6101', hours: 'Daily 6:00 AM–8:00 PM', website: 'https://foodland.com/store-locations/' }],
  [2068, {
    phoneNumber: '808-935-5533',
    hours: 'Mon–Sat 7:00 AM–7:00 PM; Sun 9:00 AM–5:00 PM',
    website: 'https://islandnaturals.com/locations',
    image: 'https://islandnaturals.com/wp-content/themes/qwertypress/images/island-naturals-hilo-organic-food-market.png',
  }],
  [2180, {
    phoneNumber: '808-965-8322',
    hours: 'Mon–Fri 8:00 AM–6:00 PM; Sat–Sun 9:00 AM–5:00 PM',
    website: 'https://islandnaturals.com/locations',
    image: 'https://islandnaturals.com/wp-content/themes/qwertypress/images/island-naturals-pahoa-organic-food-market.png',
  }],
]);

let enriched = 0;
for (const item of data.items) {
  const update = official.get(item.id);
  if (!update) continue;
  Object.assign(item, update);
  if (update.image) {
    item.images = [update.image];
    item.heroImage = update.image;
    item.imageSourceUrl = update.website;
    item.imageRights = 'Official business website';
    delete item.image;
  }
  enriched += 1;
}

if (enriched !== official.size) throw new Error(`Expected ${official.size} enrichments, applied ${enriched}`);
if (data.items.length !== 394 - removeIds.size) throw new Error('Unexpected final item count');

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Removed ${removeIds.size} records and enriched ${enriched}.`);
