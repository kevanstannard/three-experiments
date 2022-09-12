module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // globals: {
  //   THREE: true,
  //   THREEx: true,
  //   KeyboardState: true,
  //   dat: true,
  //   Stats: true,
  // },
};
