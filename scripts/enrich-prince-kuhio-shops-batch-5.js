const fs = require('fs');

const file = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = new Map([
  [2003, { website: 'https://www.princekuhioplaza.com/en/directory/34192/' }],
  [2004, { website: 'https://www.princekuhioplaza.com/en/directory/27547/' }],
  [2006, { website: 'https://www.princekuhioplaza.com/en/directory/32442/' }],
  [2007, { website: 'https://www.princekuhioplaza.com/en/directory/27570/' }],
  [2008, { website: 'https://www.princekuhioplaza.com/en/directory/27572/' }],
  [2011, { website: 'https://www.princekuhioplaza.com/en/directory/27535/', phoneNumber: '808-959-0442', image: 'https://brookfieldproperties-prince-kuhio-prod.web.arc-cdn.net/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fbrookfieldproperties%2FOK2TN62TVRBLLGNOJTI77NC3NE.jpg?smart=true&auth=b4043c8b90bc1e25a0ef0186e4420f03553b2bbd400eb75f975918fb9915e566' }],
  [2012, { website: 'https://www.princekuhioplaza.com/en/directory/31134/' }],
  [2015, { website: 'https://www.princekuhioplaza.com/en/directory/27546/', phoneNumber: '808-959-0255' }],
  [2016, { website: 'https://www.princekuhioplaza.com/en/directory/27531/', phoneNumber: '808-959-6735', image: 'https://placewise.imgix.net/images/api/retailhubjs/af7e23e5e3a899680c0ef823cb76e68f' }],
  [2017, { website: 'https://www.princekuhioplaza.com/en/directory/33579/' }],
  [2019, { website: 'https://www.princekuhioplaza.com/en/directory/33080/' }],
  [2024, { website: 'https://www.princekuhioplaza.com/en/directory/33193/' }],
  [2026, { website: 'https://www.princekuhioplaza.com/en/directory/27573/' }],
  [2028, { website: 'https://www.princekuhioplaza.com/en/directory/27530/' }],
  [2029, { website: 'https://www.princekuhioplaza.com/en/directory/33959/' }],
  [2030, { website: 'https://www.princekuhioplaza.com/en/directory/27575/' }],
  [2033, { website: 'https://www.princekuhioplaza.com/en/directory/27576/' }],
  [2034, { website: 'https://www.princekuhioplaza.com/en/directory/33530/' }],
  [2037, { website: 'https://www.princekuhioplaza.com/en/directory/27514/', phoneNumber: '808-959-1490', image: 'https://placewise.imgix.net/images/api/retailhubjs/2b6881fec69317d6a91d0ed6feeeb03a.png' }],
]);

let updated = 0;
for (const item of data.items) {
  const update = updates.get(item.id);
  if (!update) continue;
  item.website = update.website;
  if (update.phoneNumber) item.phoneNumber = update.phoneNumber;
  if (update.image) {
    item.images = [update.image];
    item.heroImage = update.image;
    item.imageSourceUrl = update.website;
    item.imageRights = 'Official shopping-center directory';
  }
  updated += 1;
}

if (updated !== updates.size) throw new Error(`Expected ${updates.size} updates, applied ${updated}`);
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${updated} Prince Kūhiō Plaza shops.`);
