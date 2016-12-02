const fonts = [
  'gentilis_bold',
  'gentilis_regular',
  'helvetiker_bold',
  'helvetiker_regular',
  'optimer_bold',
  'optimer_regular',
];

const fontMap = fonts.reduce((acc, fontId) => {
  // Webpack loads and bundles these fonts at build time,
  // they are not loaded at run time.
  const fontDefinition = require(`./fonts/${fontId}.typeface.json`);
  const font = new THREE.Font(fontDefinition);
  acc[fontId] = font;
  return acc;
}, {});

export default fontMap;
