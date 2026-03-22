export function buildCartLineId(slug, variantSelection) {
  const variantToken = Object.entries(variantSelection)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, value]) => `${name}:${value}`)
    .join('|');

  return `${slug}::${variantToken}`;
}
