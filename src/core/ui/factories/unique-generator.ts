export function generateUniqueName(prefix = 'user') {
  return `${prefix}-${Math.floor(Math.random() * 100000)}`;
}
