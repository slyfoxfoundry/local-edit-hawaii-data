const fs = require('fs');

const file = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const konaInn = new Map([
  [2099, ['abc-stores', 'Unit 1']],
  [2100, ['agape-ohana', 'Unit 174']],
  [2101, ['aloha-toe-rings', 'Unit 108']],
  [2102, ['alohae', 'Unit 45']],
  [2103, ['babe-the-unique-boutique', 'Unit 50']],
  [2104, ['candy-cove', 'Unit 129']],
  [2105, ['clover-and-mug', 'Unit 123']],
  [2107, ['da-big-bags', 'Unit 12']],
  [2108, ['everest-collection', 'Unit 60']],
  [2109, ['hawaii-titanium-rings', 'Unit 190']],
  [2110, ['hawaiian-fruit-flower', 'Unit 36']],
  [2111, ['hulakai', 'Unit 33']],
  [2112, ['nani-kai-cottage', 'Unit 171']],
  [2113, ['kona-inn-ohana-store', 'Unit 177']],
  [2114, ['kona-jewelry-factory', 'Unit 9']],
  [2115, ['kona-rock-mineral', 'Unit 105']],
  [2116, ['kona-surf-sandal', 'Unit 191']],
  [2117, ['kuai-toys', 'Unit 24']],
  [2118, ['lava-luxe-by-elle', 'Unit 141']],
  [2119, ['lava-mama', 'Unit 106']],
  [2120, ['manta-jewelry', 'Unit 193']],
  [2121, ['mary-janes-boutique', 'Unit 180']],
  [2122, ['moana-organic-trades', 'Unit 39']],
  [2123, ['pain-pod', 'Unit 74']],
  [2124, ['rokoff-studio', 'Unit 51']],
  [2125, ['show-you-hawaii', 'Unit 241']],
  [2126, ['signature-jewelry', 'Unit 117']],
  [2127, ['spiffy', 'Suite 215']],
  [2128, ['sunoa-kona', '']],
  [2129, ['world-core-surf', 'Unit 132']],
]);

const rich = new Map([
  [2090, {
    website: 'https://www.konacommons.com/hic',
    phoneNumber: '808-326-7873',
    hours: 'Mon–Thu 10:00 AM–8:00 PM; Fri–Sat 10:00 AM–9:00 PM; Sun 10:00 AM–6:00 PM',
    image: 'https://images.squarespace-cdn.com/content/v1/5c59f349b2cf79b1d60f6cd9/9da6147c-dd68-4c15-87aa-0aafa73c124f/HIC+7.jpg?format=1000w',
  }],
  [2091, {
    website: 'https://www.konacommons.com/island-naturals',
    phoneNumber: '808-326-1122',
    hours: 'Mon–Fri 8:00 AM–6:00 PM; Sat–Sun 9:00 AM–5:00 PM',
    image: 'https://images.squarespace-cdn.com/content/v1/5c59f349b2cf79b1d60f6cd9/4858f201-328a-4362-928e-a1f32c847dd8/imagejpeg_0%282%29.JPG?format=750w',
  }],
  [2092, {
    website: 'https://www.konacommons.com/jeans-warehouse',
    phoneNumber: '808-238-3491',
    hours: 'Mon–Sat 9:00 AM–9:00 PM; Sun 10:00 AM–6:00 PM',
    image: 'https://images.squarespace-cdn.com/content/v1/5c59f349b2cf79b1d60f6cd9/1642113689273-7Q0WURCD4965LJ1RVVSK/Jeans+Warehouse+2.jpg?format=1000w',
  }],
  [2235, { website: 'https://ktasuperstores.com/', image: 'https://ktasuperstores.com/wp-content/uploads/2026/08/Furikake-Rice-Puffs-_-website-1024x1024.jpg' }],
  [2236, { website: 'https://keauhoushoppingcenter.com/', image: 'https://keauhoushoppingcenter.com/wp-content/uploads/2025/05/KSC-Shopping.png' }],
  [2239, { website: 'https://ktasuperstores.com/', image: 'https://ktasuperstores.com/wp-content/uploads/2026/09/UbeCookie-1024x1024.jpg' }],
  [2240, { website: 'https://www.queensmarketplace.com/', image: 'https://www.queensmarketplace.com/wp-content/uploads/BG6A0065.jpg.webp' }],
  [2241, { website: 'https://kingsshops.com/', image: 'https://kingsshops.com/wp-content/uploads/2020/12/Generic-social-banner.jpg' }],
  [2246, { website: 'https://www.islandgourmethawaii.com/waikoloa/', image: 'https://www.islandgourmethawaii.com/wp-content/uploads/2021/05/IGM-logo-new.png' }],
  [2254, { website: 'https://maunalanicoffeeco.com/', image: 'https://maunalanicoffeeco.com/wp-content/uploads/2025/05/MaunaLani-Logo-2x.png' }],
]);

let updated = 0;
for (const item of data.items) {
  if (konaInn.has(item.id)) {
    const [slug, unit] = konaInn.get(item.id);
    item.website = `https://www.konainnshoppingvillage.com/stores/${slug}/`;
    if (unit) item.address = `75-5744 Aliʻi Dr ${unit}, Kailua-Kona, HI 96740`;
    if (item.id === 2105) item.phoneNumber = '808-333-5042';
    updated += 1;
  }

  if (rich.has(item.id)) {
    const enrichment = rich.get(item.id);
    item.website = enrichment.website;
    if (enrichment.phoneNumber) item.phoneNumber = enrichment.phoneNumber;
    if (enrichment.hours) item.hours = enrichment.hours;
    item.images = [enrichment.image];
    item.heroImage = enrichment.image;
    item.imageSourceUrl = enrichment.website;
    item.imageRights = 'Official business website';
    updated += 1;
  }
}

if (updated !== konaInn.size + rich.size) {
  throw new Error(`Expected ${konaInn.size + rich.size} updates, applied ${updated}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${updated} shop records.`);
