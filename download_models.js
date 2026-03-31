const https = require('https');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'frontend', 'public', 'models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const baseURL = 'https://raw.githubusercontent.com/vladmandic/face-api/master/model/';

const files = [
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model-shard1',
  'ssd_mobilenetv1_model-shard2',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1'
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  console.log('Downloading face-api models...');
  for (const file of files) {
    const dest = path.join(modelsDir, file);
    if (!fs.existsSync(dest)) {
      console.log(`Downloading ${file}...`);
      await downloadFile(baseURL + file, dest);
    } else {
      console.log(`${file} already exists.`);
    }
  }
  console.log('Finished downloading models.');
})();
