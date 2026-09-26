// Structural checks on server-rendered HTML. No browser scripts/resources run.
// Does not test contrast/layout, hydration, keyboard behaviour, or signed-in views.
const { JSDOM } = require('jsdom');
const axe = require('axe-core');
const fs = require('node:fs');
const routes = ['/', '/discovery', '/theories', '/calendar', '/characters', '/gigs', '/collections', '/login', '/register', '/forgot-password', '/reset-password', '/submit-theory', '/account/fan', '/contact', '/about', '/privacy', '/terms', '/home-preview', '/design-preview', '/integrations', '/500'];
(async () => {
  const results = [];
  for (const route of routes) {
    const response = await fetch(`http://localhost:3000${route}`);
    if (response.status !== (route === '/500' ? 500 : 200)) throw new Error(`${route}: HTTP ${response.status}`);
    const dom = new JSDOM(await response.text(), { url: `http://localhost:3000${route}`, runScripts: 'outside-only' });
    dom.window.eval(axe.source);
    const report = await dom.window.axe.run(dom.window.document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }, rules: { 'color-contrast': { enabled: false } } });
    results.push({ route, violations: report.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) })), incomplete: report.incomplete.map(({ id }) => id) });
    dom.window.close();
  }
  fs.writeFileSync('docs/development/accessibility-results.json', JSON.stringify({ date: '2026-09-26', method: 'axe-core on JSDOM server HTML; color contrast disabled; not browser certification', results }, null, 2) + '\n');
  console.log(JSON.stringify(results));
  if (results.some(result => result.violations.length)) process.exitCode = 1;
})().catch(error => { console.error(error.message); process.exitCode = 1; });
