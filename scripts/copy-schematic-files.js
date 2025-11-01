#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy file
function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} -> ${dest}`);
}

const distDir = path.join(__dirname, '..', 'dist', 'ngx-mat-period-picker');
const srcSchematicsDir = path.join(distDir, 'src', 'schematics');
const destSchematicsDir = path.join(distDir, 'schematics');

// Copy collection.json
copyFile(
  path.join(srcSchematicsDir, 'collection.json'),
  path.join(destSchematicsDir, 'collection.json')
);

// Copy ng-add/schema.json
copyFile(
  path.join(srcSchematicsDir, 'ng-add', 'schema.json'),
  path.join(destSchematicsDir, 'ng-add', 'schema.json')
);

console.log('Schematic files copied successfully!');
