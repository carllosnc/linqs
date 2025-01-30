interface SlugOptions {
  maxLength?: number;
  separator?: string;
}

export function generateSlug(text: string, options: SlugOptions = {}): string {
  if (typeof text !== 'string') {
      throw new TypeError('Input must be a string');
  }

  const {
      maxLength = Infinity,
      separator = '-'
  } = options;

  let slug: string = text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  slug = slug
      .replace(/[^a-z0-9]+/g, separator)
      .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '')
      .replace(new RegExp(`${separator}+`, 'g'), separator);

  if (maxLength < Infinity && slug.length > maxLength) {
      const lastSeparatorIndex: number = slug.substring(0, maxLength).lastIndexOf(separator);
      if (lastSeparatorIndex !== -1) {
          slug = slug.substring(0, lastSeparatorIndex);
      } else {
          slug = slug.substring(0, maxLength);
      }
  }

  return slug;
}
