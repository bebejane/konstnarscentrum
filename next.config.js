const webpack = require("webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

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
		return {
			beforeFiles: [
				{
					source: "/:path*",
					has: [
						{
							type: "host",
							value: "kc-vast.se",
						},
					],
					destination: "/vast",
				},
				{
					source: "/:path*",
					has: [
						{
							type: "host",
							value: "kc-mitt.se",
						},
					],
					destination: "/mitt",
				},
				{
					source: "/:path*",
					has: [
						{
							type: "host",
							value: "kc-nord.se",
						},
					],
					destination: "/nord",
				},
				{
					source: "/:path*",
					has: [
						{
							type: "host",
							value: "kcsyd.se",
						},
					],
					destination: "/syd",
				},
				{
					source: "/:path*",
					has: [
						{
							type: "host",
							value: "kcost.se",
						},
					],
					destination: "/ost",
				},
				{
					source: "/riks",
					destination: "/",
				},
				{
					source: "/riks/:path*",
					destination: "/:path*",
				},
			],
		};
	},
	async headers() {
		return [
			{
				source: "/fonts/:path*",
				headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
			},
		];
	},
};

/**
 * @type {import('next').NextConfig}
 */
const config = { sassOptions, ...nextOptions };
module.exports = config;
