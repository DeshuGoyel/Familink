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
  
  // Replace <any[]> with <unknown[]>
  content = content.replace(/<any\[\]>/g, '<unknown[]>');
  // Replace <any> with <unknown>
  content = content.replace(/<any>/g, '<unknown>');
  // Replace : any with : unknown
  content = content.replace(/:\s*any\b/g, ': unknown');
  
  // Fix unused 'err' by replacing 'catch (err)' with 'catch (_err)'
  content = content.replace(/catch \((err|e)\)/g, 'catch (_$1)');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    changedFiles++;
  }
});

console.log(`Updated ${changedFiles} files`);
