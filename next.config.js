const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
const webpack = require("webpack");

const sassOptions = {
	includePaths: ["./components", "./pages"],
	prependData: `
    @use "sass:math";
    @import "./lib/styles/mediaqueries"; 
    @import "./lib/styles/fonts";
  `,
};
const nextOptions = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	experimental: {
		scrollRestoration: true,
	},
	webpack: (config, ctx) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			exclude: /node_modules/,
			use: ["@svgr/webpack"],
		});
		config.plugins.push(
			new webpack.DefinePlugin({
				__DEV__: process.env.NODE_ENV === "development",
			})
		);
		return config;
	},
	async redirects() {
		return [
			{
				source: "/riks",
				destination: "/",
				permanent: true,
			},
			{
				source: "/riks/:path*",
				destination: "/:path*",
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/riks",
				destination: "/",
			},
			{
				source: "/riks/:path*",
				destination: "/:path*",
			},
		];
	},
	async headers() {
		return [
			{
				source: "/fonts/:path*",
				headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
			},
			{
				source: "/images/:path*",
				headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
			},
		];
	},
};

const config = { sassOptions, ...nextOptions };
module.exports = withBundleAnalyzer(config);
