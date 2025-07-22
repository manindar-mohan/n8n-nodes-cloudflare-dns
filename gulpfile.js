const { src, dest } = require('gulp');

function copyIcons() {
  const nodeSource = src(['nodes/**/*.{png,svg}']);
  const credSource = src(['credentials/**/*.{png,svg}']);

  return nodeSource.pipe(dest('dist/nodes')).on('end', () => {
    credSource.pipe(dest('dist/credentials'));
  });
}

exports.build = exports.default = copyIcons;
exports['build:icons'] = copyIcons;
