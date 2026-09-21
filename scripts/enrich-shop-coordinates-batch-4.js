const fs = require('fs');

const file = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const coordinateGroups = [
  {
    ids: [2003, 2004, 2006, 2007, 2008, 2011, 2012, 2015, 2016, 2017, 2019, 2024, 2026, 2028, 2029, 2030, 2033, 2034, 2037],
    latitude: '19.6965367',
    longitude: '-155.0621084',
  },
  {
    ids: [2064, 2065, 2066, 2067, 2068],
    latitude: '19.7106542',
    longitude: '-155.075939',
  },
  {
    ids: [2099, 2100, 2101, 2103, 2104, 2105, 2107, 2108, 2109, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2125, 2126, 2127, 2129],
    latitude: '19.638258',
    longitude: '-155.9937826',
  },
  {
    ids: [2073],
    latitude: '19.7210112',
    longitude: '-155.0835088',
  },
];

const coordinates = new Map();
for (const group of coordinateGroups) {
  for (const id of group.ids) coordinates.set(id, [group.latitude, group.longitude]);
}

let updated = 0;
for (const item of data.items) {
  const match = coordinates.get(item.id);
  if (!match) continue;
  if (item.latitude || item.longitude) throw new Error(`Refusing to overwrite coordinates for ${item.id}`);
  [item.latitude, item.longitude] = match;
  updated += 1;
}

if (updated !== 50) throw new Error(`Expected 50 coordinate updates, applied ${updated}`);

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated coordinates for ${updated} shop records.`);
