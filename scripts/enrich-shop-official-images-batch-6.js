const fs = require('fs');

const path = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const updates = {
  2146: { phoneNumber: '808-887-2707', website: 'https://shopmaryjanes.com/', summary: 'Women’s apparel, jewelry, accessories and island-made gifts at Parker Ranch Center.', heroImage: 'https://parkerranchcenter.com/wp-content/uploads/2018/01/mary_janes.png', imageSourceUrl: 'https://parkerranchcenter.com/stores/mary-janes/', imageRights: 'Official shopping-center directory', latitude: '20.0202355', longitude: '-155.6685378' },
  2158: { website: 'https://foodland.com/store-locations/', hours: 'Daily 5:00 AM–11:00 PM', summary: 'Locally owned Hawaiʻi supermarket at Parker Ranch Center.', heroImage: 'https://parkerranchcenter.com/wp-content/uploads/2017/02/Foodland@2x-1.png', imageSourceUrl: 'https://parkerranchcenter.com/stores/foodland/', imageRights: 'Official shopping-center directory', latitude: '20.0202355', longitude: '-155.6685378' },
  2245: { heroImage: 'https://www.sohaliving.com/cdn/shop/files/41687-000-Lei-Halo-Cooler-Bag-003.jpg?v=1789042230', imageSourceUrl: 'https://www.sohaliving.com/', imageRights: 'Official business website', summary: 'Hawaiʻi-inspired home décor, gifts and accessories at Queens’ Marketplace.' },
  2260: { heroImage: 'https://5b0cf3cd4a269dccd702.cdn6.editmysite.com/uploads/b/5b0cf3cd4a269dccd702f9f4ab39eabed08401031e526b8a6601da141a032120/TastyKona-Treats%26Treasures-Logo_1682623537.jpg?width=2400&optimize=medium', imageSourceUrl: 'http://www.tastykona.com/', imageRights: 'Official business website', summary: 'Big Island-made treats, pantry goods and gifts at Coconut Grove Marketplace.' },
  2289: { heroImage: 'https://imageresizer.furnituredealer.net/img/remote/images.furnituredealer.net/rodeo/prod/845720474c4c7d954832bdde4bd00064/files/98cfdeca-dc4f-410d-aaa7-d1fe1d611cb1.jpg?format=webp&quality=85&cropxunits=100&cropyunits=100&crop=0,0,100,100', imageSourceUrl: 'https://www.homeworld.com/', imageRights: 'Official business website' },
  2312: { hours: 'Daily 5:00 AM–9:00 PM', summary: 'Locally operated convenience market serving Laupahoehoe.' },
  2349: { website: 'https://shopmahina.com/', hours: 'Mon–Fri 10:00 AM–6:00 PM; Sat 9:00 AM–6:00 PM; Sun 10:00 AM–5:00 PM', summary: 'Hawaiʻi women’s boutique known for breezy dresses, tops and accessories.', heroImage: 'https://parkerranchcenter.com/wp-content/uploads/2017/03/Mahina@2x.png', imageSourceUrl: 'https://parkerranchcenter.com/stores/mahina/', imageRights: 'Official shopping-center directory' },
  2350: { website: 'https://www.alohagrown.com/', hours: 'Mon–Sat 9:00 AM–4:30 PM; Sun 9:00 AM–3:30 PM', summary: 'Hawaiʻi-designed clothing and accessories inspired by local farming, ranching and hunting culture.', heroImage: 'https://parkerranchcenter.com/wp-content/uploads/2024/03/AlohaGrown_2024@2x.webp', imageSourceUrl: 'https://parkerranchcenter.com/stores/aloha-grown/', imageRights: 'Official shopping-center directory' },
  2359: { website: 'https://www.homeworld.com/', heroImage: 'https://imageresizer.furnituredealer.net/img/remote/images.furnituredealer.net/rodeo/prod/845720474c4c7d954832bdde4bd00064/files/3eeed60a-4f9c-4496-87e7-8c08b0b59070.jpg?format=webp&quality=85&cropxunits=100&cropyunits=100&crop=0,0,100,100', imageSourceUrl: 'https://www.homeworld.com/', imageRights: 'Official business website' }
};

for (const id of [2225, 2235, 2236, 2259, 2272]) Object.assign(updates[id] ||= {}, { latitude: '19.5711198', longitude: '-155.9620457' });
for (const id of [2234, 2276]) Object.assign(updates[id] ||= {}, { latitude: '19.613932', longitude: '-155.98092' });
Object.assign(updates[2172] ||= {}, { latitude: '19.5051411', longitude: '-154.9586971' });
Object.assign(updates[2277] ||= {}, { latitude: '19.7351657', longitude: '-156.0411384' });
Object.assign(updates[2320] ||= {}, { latitude: '19.702631', longitude: '-155.063571' });

let changed = 0;
for (const item of data.items) {
  const update = updates[item.id];
  if (!update) continue;
  Object.assign(item, update);
  if (update.heroImage) item.images = [update.heroImage];
  changed++;
}

if (changed !== Object.keys(updates).length) throw new Error(`Expected ${Object.keys(updates).length} updates, applied ${changed}`);
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Updated ${changed} shop records`);
