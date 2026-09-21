const fs = require('fs');

const file = 'shop-discovery.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const images = new Map([
  [2178, ['https://static1.squarespace.com/static/604041411a048874afdb4e3e/t/60528d528799d1538a457ad7/1616022876484/SFOC21_17243_MalamaMarket-MalamaMarketPahoaAssets-HeaderBanner.jpg?format=1500w', 'https://malamamarketpahoa.com/']],
  [2189, ['https://volcanogallery.com/_media/img/xlarge/1012202357-2.jpg', 'https://www.volcanogallery.com/']],
  [2190, ['https://media.rainpos.com/730/Happy_Place.jpg', 'https://www.kilaueakreations.com/']],
  [2195, ['https://hilocoffeemill.com/cdn/shop/files/HILO_Social-Share.jpg?v=1780943391', 'https://hilocoffeemill.com/']],
  [2200, ['https://www.hawaiislocalbuzz.com/assets/images/slider1.jpg', 'https://www.hawaiislocalbuzz.com/']],
  [2216, ['https://cdn11.bigcommerce.com/s-hulguc0f6a/images/stencil/1536w/carousel/98/Hala_Tree_Coffee_Home.png?c=2', 'https://halatreecoffee.com/']],
  [2220, ['https://ntmg-media.s3.us-west-1.amazonaws.com/60770009-4910-5554-b5e9-631fd58555da/tut/3999c51a-610e-4e23-b1cc-2c78fa0d54a8.jpg', 'https://ucc-hawaii.com/']],
  [2222, ['https://mountainthunder.com/cdn/shop/files/Premium-Kona-Coffee.png?v=1760712952&width=1600', 'https://mountainthunder.com/']],
  [2227, ['https://www.greenwellfarms.com/cdn/shop/files/2S3A8860_1_1_a5daf917-2a4f-4dfb-8253-62dbc109b3f8_1200x.png?v=1676340271', 'https://www.greenwellfarms.com/']],
  [2228, ['https://static.wixstatic.com/media/193f15_c38d371fccdd48c7ba2fda4b070a11c8~mv2.jpg/v1/fill/w_1348,h_680,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/193f15_c38d371fccdd48c7ba2fda4b070a11c8~mv2.jpg', 'https://www.kuaiwifarm.com/']],
  [2230, ['https://www.roosterfarms.com/images/projects/gold-and-gold/bs_cov.jpg', 'https://www.roosterfarms.com/']],
  [2242, ['https://theshopsatmaunalani.com/wp-content/uploads/SAML-Logo.png', 'https://theshopsatmaunalani.com/']],
  [2243, ['https://coconene.com/cdn/shop/files/wall_decor_Ohana_surfboards_CocoNene_HI.jpg?v=1769168001', 'https://coconene.com/']],
  [2251, ['https://foodland.com/wp-content/uploads/2023/04/foodland-farms-maunalani.jpg', 'https://foodland.com/stores/foodland-farms-mauna-lani-kamuela/']],
  [2252, ['https://hicsurf.com/cdn/shop/files/Hero_Josh_2880x1300_c8188fbe-7a6f-4909-91a2-4cbb37c95211.webp?v=1782791589&width=1920', 'https://hicsurf.com/']],
  [2253, ['https://static.wixstatic.com/media/e68264_30ddc01a16b54bd99111baa7eb75e7d9~mv2.jpeg/v1/fill/w_1200,h_450,al_c/e68264_30ddc01a16b54bd99111baa7eb75e7d9~mv2.jpeg', 'https://www.beachesresortwear.com/']],
  [2258, ['https://5b0cf3cd4a269dccd702.cdn6.editmysite.com/uploads/b/5b0cf3cd4a269dccd702f9f4ab39eabed08401031e526b8a6601da141a032120/Collage%20Header%201_1757105109.png?width=2400&optimize=medium', 'https://www.tastykona.com/']],
  [2272, ['https://konastories.com/sites/default/files/styles/homepage_slider/public/2023-12/cline-royer-photo.jpg?itok=7NsnPmPT', 'https://konastories.com/']],
  [2290, ['https://cdn-files.eu.placewise.com/f/COaJPRCcDxoTY21zX2NvbXBvbmVudF9pbWFnZSIVaWQtMTc2ODUwMjY3NjY3OS05MDk0OKSz0E82BL9TdrUleUYnMj8lFMFq?transform=output=format:webp,quality:80/resize=width:1440,height:950,fit:clip', 'https://www.thecoconutgrovemarketplace.com/']],
  [2311, ['https://papaaloacountrystore.com/wp-content/uploads/2020/06/3-1.png', 'https://papaaloacountrystore.com/']],
]);

let updated = 0;
for (const item of data.items) {
  const match = images.get(item.id);
  if (!match) continue;
  const [image, source] = match;
  item.images = [image];
  item.heroImage = image;
  item.imageSourceUrl = source;
  item.imageRights = 'Official business website';
  updated += 1;
}

if (updated !== images.size) {
  throw new Error(`Expected ${images.size} image updates, applied ${updated}`);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${updated} shop images.`);
