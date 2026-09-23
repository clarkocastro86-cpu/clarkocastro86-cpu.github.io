/**
 * Normalizes asset URLs so they work seamlessly on both custom domains
 * and GitHub Pages repository subpaths (e.g., https://username.github.io/repo-name/)
 */
export function resolveAssetUrl(url: string): string {
  if (!url) return '';
  // If data URI or absolute HTTP(S) URL, leave as is
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }

  const base = import.meta.env.BASE_URL || './';
  
  // Strip leading slash if any
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;

  // If already relative with ./
  if (url.startsWith('./')) {
    return url;
  }

  // Combine with base ensuring no double slashes
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}
