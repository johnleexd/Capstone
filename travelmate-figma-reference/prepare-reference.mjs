import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const out = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(out);
const frontend = path.join(root, 'travelmate-frontend-new');
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const manifest = [];
function copyTree(relative) {
  const dir = path.join(frontend, relative);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const next = path.join(relative, entry.name);
    if (next.replaceAll('\\', '/').startsWith('app/api')) continue;
    if (entry.isDirectory()) { copyTree(next); continue; }
    if (!/\.(tsx?|css|png|jpg|jpeg|svg|ico)$/.test(entry.name)) continue;
    const bytes = fs.readFileSync(path.join(frontend, next));
    const target = path.join(out, 'source', next);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, bytes);
    manifest.push({ path: next.replaceAll('\\', '/'), bytes: bytes.length, sha256: sha256(bytes) });
  }
}
for (const dir of ['app', 'components', 'hooks', 'services', 'lib', 'styles', 'constants', 'public']) copyTree(dir);
for (const file of ['PRODUCT_BASELINE.md', 'README.md']) {
  fs.mkdirSync(path.join(out, 'baseline'), { recursive: true });
  fs.copyFileSync(path.join(root, file), path.join(out, 'baseline', file));
}
const screenshots = ['destination-area-comparison-mobile.png', 'exchange-rate-unavailable.png'];
for (const file of screenshots) {
  fs.mkdirSync(path.join(out, 'historical-screenshots'), { recursive: true });
  fs.copyFileSync(path.join(root, 'audit', '2026-10-06', file), path.join(out, 'historical-screenshots', file));
}
fs.writeFileSync(path.join(out, 'SOURCE_MANIFEST.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(out, 'ASSET_MANIFEST.json'), JSON.stringify(manifest.filter(item => item.path.startsWith('public/')), null, 2));
const inventory = [];
for (const item of manifest.filter(item => /\.(tsx?|css)$/.test(item.path))) {
  const lines = fs.readFileSync(path.join(frontend, item.path), 'utf8').split(/\r?\n/);
  const matches = lines.flatMap((text, i) => /role="dialog"|<label|<h[1-4]|aria-label=|window.confirm|type Tab|type AuthMode|fetch\(|bg-\[#|href=/.test(text) ? [{ line: i + 1, text }] : []);
  if (matches.length) inventory.push({ path: item.path, matches });
}
fs.writeFileSync(path.join(out, 'UI_SOURCE_INDEX.json'), JSON.stringify(inventory, null, 2));
for (const item of manifest) {
  if (sha256(fs.readFileSync(path.join(out, 'source', item.path))) !== item.sha256) throw new Error(`Copy mismatch: ${item.path}`);
  if (sha256(fs.readFileSync(path.join(frontend, item.path))) !== item.sha256) throw new Error(`Original changed: ${item.path}`);
}
console.log(JSON.stringify({ copiedFiles: manifest.length, assets: manifest.filter(x => x.path.startsWith('public/')).length, indexedFiles: inventory.length, status: 'Reference only. All copied files match originals. No Figma artifact created.' }));
