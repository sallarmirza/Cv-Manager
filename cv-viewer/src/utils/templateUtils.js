
export const hasContent = (arr, keys) =>
  arr.some((item) => keys.some((k) => item[k]));

export const filterBullets = (bullets) =>
  (bullets || []).filter(Boolean);