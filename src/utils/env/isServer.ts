export default function isServer() {
  return typeof window === 'undefined' && typeof global !== 'undefined';
}
