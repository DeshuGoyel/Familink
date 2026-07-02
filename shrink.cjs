const sharp = require('sharp');
sharp('public/logo-dark.png')
  .resize(800)
  .webp({ quality: 80 })
  .toFile('public/logo-dark-opt.png')
  .then(() => console.log('Optimized'))
  .catch(console.error);
