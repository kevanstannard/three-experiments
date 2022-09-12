// eslint-disable-next-line no-undef
const fontLoader = new THREE.FontLoader();

const fonts = [
  "gentilis_bold",
  "gentilis_regular",
  "helvetiker_bold",
  "helvetiker_regular",
  "optimer_bold",
  "optimer_regular",
];

export function loadFont(url) {
  return new Promise((resolve) => {
    fontLoader.load(url, resolve);
  });
}

export function loadFonts() {
  const promises = fonts.map((id) => {
    const url = `/assets/fonts/${id}.typeface.json`;
    return loadFont(url).then((font) => ({ id, font }));
  });
  return Promise.all(promises).then((results) => {
    const map = results.reduce(
      (acc, result) => ({
        ...acc,
        [result.id]: result.font,
      }),
      {}
    );
    return map;
  });
}
