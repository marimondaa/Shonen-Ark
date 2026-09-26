export function localDay(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function weekDates(today, offset = 0) {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  start.setDate(start.getDate() - (start.getDay()+6)%7 + offset*7);
  return Array.from({length:8}, (_,i) => new Date(start.getFullYear(),start.getMonth(),start.getDate()+i));
}
export function validScheduleRange(from, to, now = Date.now()) {
  return Number.isInteger(from) && Number.isInteger(to) && to > from && to-from <= 8*86400 && from >= now/1000-64*86400 && to <= now/1000+64*86400;
}
