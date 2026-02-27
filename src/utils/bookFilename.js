/**
 * Converts a book title to the filename slug used for cover images.
 * Matches the convention in fetch_covers.py: spaces → underscores,
 * apostrophes stripped, lowercased.
 *
 * @param {string} title
 * @returns {string} e.g. "The Way of Kings" → "the_way_of_kings"
 */
export const toImageFilename = (title) =>
    title.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
