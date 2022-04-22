const { resolve } = require('path');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    ROOT_PATH: resolve(__dirname),
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

module.exports = nextConfig;
