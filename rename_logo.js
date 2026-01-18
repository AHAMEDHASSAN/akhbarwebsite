const fs = require('fs');
const path = require('path');

const oldPath = path.join(process.cwd(), 'public', 'LogoNewUbdate.png');
const newPath = path.join(process.cwd(), 'public', 'LogoNew.png');

console.log(`Renaming ${oldPath} to ${newPath}`);

try {
  if (fs.existsSync(newPath)) {
    console.log('Target file already exists. Deleting it first...');
    fs.unlinkSync(newPath);
  }
  fs.renameSync(oldPath, newPath);
  console.log('Success');
} catch (e) {
  console.error('Error renaming file:', e.message);
}
