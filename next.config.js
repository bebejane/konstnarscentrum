const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: process.env.ANALYZE === 'true'})

const sassOptions = {
  includePaths: ['./components', './pages'],
  prependData: `
    @use "sass:math";
    @import "./lib/styles/partials/mediaqueries"; 
    @import "./lib/styles/partials/styles";
    @import "./lib/styles/partials/variables";
    @import "./lib/styles/partials/fonts";
  `
}
const nextOptions = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false
  },
  experimental: {
    scrollRestoration: true
  },
  webpack: (config, ctx) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: ['@svgr/webpack'],
    })
    
    return config;
  },
}

const config = { sassOptions, ...nextOptions }
module.exports = withBundleAnalyzer(config);