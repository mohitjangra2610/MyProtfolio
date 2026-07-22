export default {
  "*.{js,jsx,ts,tsx,mjs,cjs,json}": [
    "biome check --write --unsafe",
  ],

  "*.{css}": [
    "biome check --write --unsafe",
  ],
};
