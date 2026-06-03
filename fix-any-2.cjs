const fs = require('fs');
const path = require('path');

const basePath = path.resolve(__dirname);

function walk(dir) {
  const resolvedDir = path.normalize(path.resolve(basePath, dir));
  if (!resolvedDir.startsWith(basePath)) {
    throw new Error("Path traversal detected: attempt to read directory outside the project root.");
  }

  let results = [];
  const list = fs.readdirSync(resolvedDir);
  list.forEach(file => {
    const resolvedFile = path.normalize(path.join(resolvedDir, file));
    if (!resolvedFile.startsWith(basePath)) {
      throw new Error("Path traversal detected: attempt to access file outside the project root.");
    }

    const stat = fs.statSync(resolvedFile);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(resolvedFile));
    } else if (resolvedFile.endsWith('.tsx') || resolvedFile.endsWith('.ts')) {
      results.push(resolvedFile);
    }
  });
  return results;
}

const files = walk('./src');
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace as any with as unknown
  content = content.replace(/as any\b/g, 'as unknown');
  
  // Fix unused 'totalValue'
  if (file.endsWith('Heirs.tsx')) {
     content = content.replace(/const totalValue = /, '// const totalValue = ');
  }
  
  // Fix unused 'notification'
  if (file.endsWith('IdentityPassport.tsx')) {
     content = content.replace(/notification \=\> \(/, '_notification => (');
  }
  
  // Fix unused 'i'
  if (file.endsWith('Settings.tsx')) {
     content = content.replace(/\(_, i\)/, '(_, _i)');
  }
  
  // Fix unused 'copyToClipboard'
  if (file.endsWith('DeveloperPortal.tsx')) {
     content = content.replace(/const copyToClipboard = /, '// const copyToClipboard = ');
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedFiles++;
  }
});

console.log(`Updated ${changedFiles} files`);
