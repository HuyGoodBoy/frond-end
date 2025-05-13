const fs = require('fs');
const path = require('path');

// Đường dẫn đến thư mục dist và thư mục gốc
const distDir = path.join(__dirname, 'dist');
const rootDir = path.join(__dirname, 'gh-pages');

// Danh sách các file/thư mục không muốn xóa trong thư mục gh-pages
const excludeFromClean = [
  '.git',
  'node_modules',
  'src',
  'public',
  'package.json',
  'package-lock.json',
  'deploy.js',
  'deploy.cjs',
  'vite.config.js',
  'README.md'
];

// Tạo thư mục gh-pages nếu nó không tồn tại
if (!fs.existsSync(rootDir)) {
  fs.mkdirSync(rootDir);
}

// Hàm đệ quy để sao chép tất cả các file từ một thư mục sang thư mục khác
function copyFolderSync(from, to) {
  // Tạo thư mục đích nếu nó không tồn tại
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to);
  }

  // Đọc tất cả các file và thư mục trong thư mục nguồn
  fs.readdirSync(from).forEach(element => {
    const stat = fs.statSync(path.join(from, element));
    
    if (stat.isFile()) {
      // Nếu là file, sao chép nó
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      // Nếu là thư mục, tạo thư mục đích và sao chép đệ quy
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

// Sao chép tất cả các file từ dist sang thư mục gh-pages
try {
  console.log('Copying files from dist to gh-pages directory...');
  copyFolderSync(distDir, rootDir);
  console.log('Files copied successfully!');
} catch (err) {
  console.error('Error copying files:', err);
} 