const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const outputFolder = 'build';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: `${outputFolder}/.next`,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: join(__dirname, 'content'),
            to: join(__dirname, `${outputFolder}/.data/content`),
          },
        ],
      }),
    );

    return config;
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

module.exports = nextConfig;