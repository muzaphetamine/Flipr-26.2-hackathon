const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Your function to get CSV file names
function getAllCsvFileNamesWithoutExtension(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllCsvFileNamesWithoutExtension(fullPath, arrayOfFiles); // recurse into subfolder
    } else if (path.extname(fullPath).toLowerCase() === '.csv') {
      const nameWithoutExt = path.basename(file, '.csv');
      arrayOfFiles.push(nameWithoutExt);
    }
  });

  return arrayOfFiles;
}

// Set your folder path here
const folderPath = './data/stocks';
const csvFileNames = getAllCsvFileNamesWithoutExtension(folderPath);

// Serve static HTML from /public
app.use(express.static('public'));

// API route to send CSV file names
app.get('/api/files', (req, res) => {
  res.json(csvFileNames);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
