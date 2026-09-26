export const SERIES = ['One Piece', 'Naruto', 'Bleach', 'Jujutsu Kaisen', 'Demon Slayer', 'Attack on Titan', 'Other'];

export function textField(value, name, min, max) {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) {
    throw new Error(`${name} must contain ${min}–${max} characters.`);
  }
  return value.trim();
}

export function validateTheory(body) {
  if (!SERIES.includes(body.series)) throw new Error('Choose a series.');
  if (!['draft', 'published'].includes(body.status)) throw new Error('Choose draft or published.');
  return {
    title: textField(body.title, 'Title', 5, 140),
    summary: textField(body.summary, 'Summary', 10, 400),
    content: textField(body.content, 'Theory', 50, 20000),
    series: body.series,
    status: body.status,
    spoiler: body.spoiler === true,
  };
}

export function validateGig(body) {
  const contact = textField(body.contact_url, 'Contact URL', 8, 500);
  let url;
  try { url = new URL(contact); } catch { throw new Error('Use a valid HTTPS contact URL.'); }
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Use a valid HTTPS contact URL.');
  return {
    title: textField(body.title, 'Title', 5, 140),
    description: textField(body.description, 'Description', 30, 5000),
    budget: textField(body.budget, 'Budget', 2, 80),
    contact_url: url.href,
  };
}

export function isUuid(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
