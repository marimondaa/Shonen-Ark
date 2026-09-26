import { WebhookUtils } from '../../src/lib/webhook';
import { validateTheory, validateGig, isUuid } from '../../src/lib/community-validation';
const signing = new WebhookUtils({ secret: 'test-secret' });

test('signature detects tampered bodies', () => {
  const signature = signing.generateSignature('{"a":1}');
  expect(signing.verifySignature('{"a":1}', signature)).toBe(true);
  expect(signing.verifySignature('{"a":2}', signature)).toBe(false);
});
test('expired and invalid timestamps fail closed', () => {
  for (const timestamp of ['1', 'not-a-number']) {
    expect(signing.verifySignature('{}', signing.generateSignature('{}', timestamp), timestamp)).toBe(false);
  }
});
test('unconfigured webhook secret fails closed', () => {
  const missing = new WebhookUtils({ secret: '' });
  expect(missing.verifySignature('{}', missing.generateSignature('{}'))).toBe(false);
});
test('accepts a valid theory and trims fields', () => {
  const data = validateTheory({ title: '  A theory  ', summary: 'A thoughtful summary', content: 'Evidence and interpretation. '.repeat(4), series: 'One Piece', status: 'draft', spoiler: true });
  expect(data.title).toBe('A theory'); expect(data.status).toBe('draft'); expect(data.spoiler).toBe(true);
});
test.each([{ title: 'x' }, { series: 'Unknown' }, { status: 'admin' }, { content: '<x>' }])('rejects invalid theory %s', patch => {
  expect(() => validateTheory({ title: 'A theory', summary: 'A thoughtful summary', content: 'Evidence. '.repeat(10), series: 'One Piece', status: 'draft', ...patch })).toThrow();
});
test.each(['javascript:alert(1)', 'http://example.test', 'https://user:pass@example.test'])('rejects unsafe contact link %s', contact_url => {
  expect(() => validateGig({ title: 'Artist wanted', description: 'A detailed collaboration description.', budget: 'CAD 200', contact_url })).toThrow();
});
test('accepts HTTPS contact link and validates IDs', () => {
  expect(validateGig({ title: 'Artist wanted', description: 'A detailed collaboration description.', budget: 'CAD 200', contact_url: 'https://example.test/contact' }).contact_url).toBe('https://example.test/contact');
  expect(isUuid('not-an-id')).toBe(false); expect(isUuid('11111111-1111-4111-8111-111111111111')).toBe(true);
});
