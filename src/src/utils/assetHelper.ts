/**
 * Normalizes asset URLs so they work seamlessly on both custom domains
 * and GitHub Pages repository subpaths (e.g., https://username.github.io/repo-name/)
 */
export function resolveAssetUrl(url: string): string {
  if (!url) return '';
  
  // If data URI or external URL, return directly
  if (
    url.startsWith('data:') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  // If URL already includes base, don't duplicate it
  if (url.startsWith(normalizedBase)) {
    return url;
  }

  // Strip any leading ./ or / from path
  const cleanPath = url.replace(/^\.?\//, '');

  return `${normalizedBase}${cleanPath}`;
}
