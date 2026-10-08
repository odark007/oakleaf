const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy api directory
copyDir(path.join(__dirname, "api"), path.join(__dirname, "out", "api"));

// Copy admin directory
copyDir(path.join(__dirname, "admin"), path.join(__dirname, "out", "admin"));

console.log("Copied api/ and admin/ to out/");
