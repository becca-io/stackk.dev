export default function getLocalStorageValue(key: string, defaultValue = '') {
  const rawData = localStorage.getItem(key);

  if (rawData == null) {
    return defaultValue;
  }
  try {
    return JSON.parse(rawData);
  } catch {
    return defaultValue;
  }
}
