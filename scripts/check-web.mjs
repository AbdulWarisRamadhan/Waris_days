import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'www', 'index.html');

function fail(message) {
  console.error(`VERIFY FAILED: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(htmlPath)) {
  fail('www/index.html tidak ditemukan.');
  process.exit();
}

const html = fs.readFileSync(htmlPath, 'utf8');
const required = [
  ['HTML document', /<!doctype html>/i],
  ['head element', /<head\b/i],
  ['app root', /id="app"/i],
  ['dashboard page', /id="page-dashboard"/i],
  ['finance page', /id="page-finance"/i],
  ['kitchen page', /id="page-kitchen"/i],
  ['care page', /id="page-care"/i],
  ['local storage persistence', /localStorage\.(getItem|setItem)/],
  ['mobile viewport', /name="viewport"/i]
];
for (const [label, pattern] of required) {
  if (!pattern.test(html)) fail(`${label} belum ada.`);
}

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
if (scripts.length === 0) fail('Tidak ada blok JavaScript untuk diperiksa.');
for (let i = 0; i < scripts.length; i++) {
  const source = scripts[i][1].trim();
  if (!source) continue;
  try {
    new vm.Script(source, { filename: `www/index.html:inline-script-${i + 1}` });
  } catch (error) {
    fail(`Sintaks JavaScript blok ${i + 1}: ${error.message}`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log('VERIFY OK: struktur HTML, modul utama, persistensi lokal, dan sintaks JavaScript lolos pemeriksaan dasar.');
console.log('Catatan: ini pemeriksaan statis, bukan pengujian interaksi penuh di perangkat Android.');
