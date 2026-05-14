const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
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
