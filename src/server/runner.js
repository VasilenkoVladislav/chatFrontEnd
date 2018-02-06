require('babel-core/register');
['.css', '.scss', '.ttf', '.woff', '.woff2', '.eot', '.otf', '.png', '.jpg'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('./server.js');
