const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: join(__dirname, 'src/content'),
            to: join(__dirname, '.next/content'),
          },
        ],
      }),
    );

    return config;
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

module.exports = nextConfig;
