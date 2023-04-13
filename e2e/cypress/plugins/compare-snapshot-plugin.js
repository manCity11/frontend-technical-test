const path = require('path');
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const e2e = require('../../config');

const parseImage = (filePath) => new Promise((res, rej) => {
  new PNG({ filterType: 4 }).parse(fs.readFileSync(filePath), (err, data) => {
    if (err) {
      rej(err);
    }
    res(data);
  });
});

// inspired from blinkDiff
function createComposition(imageA, imageB, imageOutput) {
  let image;
  const width = Math.max(imageA.width, imageB.width);
  const height = Math.max(imageA.height, imageB.height);

  if (width > height) {
    image = new PNG({ width, height: height * 3 });

    imageA.bitblt(image, 0, 0, imageA.width, imageA.height, 0, 0);
    imageOutput.bitblt(image, 0, 0, imageOutput.width, imageOutput.height, 0, height);
    imageB.bitblt(image, 0, 0, imageB.width, imageB.height, 0, height * 2);
  } else {
    image = new PNG({ width: width * 3, height });

    imageA.bitblt(image, 0, 0, imageA.width, imageA.height, 0, 0);
    imageOutput.bitblt(image, 0, 0, imageOutput.width, imageOutput.height, width, 0);
    imageB.bitblt(image, 0, 0, imageB.width, imageB.height, width * 2, 0);
  }

  return PNG.sync.write(image);
}

function compareSnapshotsPlugin(args, config) {
  const buildPath = (pathName, type) => path.join(pathName, args.specDirectory, `${args.fileName}-${type}.png`);

  if (!args.isEnabled) {
    return Promise.resolve(0);
  }

  return Promise.all([
    parseImage(buildPath(e2e.paths.run, e2e.types.run)),
    parseImage(buildPath(config.isLocal ? e2e.paths.baseLocal : e2e.paths.baseGlobal, e2e.types.base)),
  ]).then(([newImg, baseImg]) => {
    const { width, height } = baseImg;
    const diff = new PNG({ width, height });

    const pixelDiff = pixelmatch(newImg.data, baseImg.data, diff.data, width, height, { threshold: 0 });

    if (pixelDiff >= 5) {
      return new Promise((resolve, reject) => {
        fs.mkdir(path.join(e2e.paths.diff, args.specDirectory), { recursive: true }, (err) => {
          if (err) {
            return reject(err);
          }

          fs.writeFileSync(buildPath(e2e.paths.diff, e2e.types.diff), createComposition(newImg, baseImg, diff));
          resolve(pixelDiff);
        });
      });
    }

    return 0;
  });
}

function getCompareSnapshotsPlugin({ env }) {
  return { compareSnapshotsPlugin: (args) => compareSnapshotsPlugin(args, env) };
}

module.exports = getCompareSnapshotsPlugin;
