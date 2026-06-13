import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env = {}) => {
	const getEnv = () => {
		if (env.production) return "production";
		if (env.server) return "server";
		return "development"
	}

	return {
		mode: env.production ? 'production' : 'development',
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(getEnv()),
			})
		],
		devtool: env.production ? false : 'source-map',
		entry: {
			popup: './src/ts/popup/index.ts',
			content: './src/ts/content/index.ts',
			background: './src/ts/background/index.ts',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			alias: {
				'@Base': path.resolve(__dirname, 'src/ts/base'),
				'@PopUp': path.resolve(__dirname, 'src/ts/popup'),
				'@Content': path.resolve(__dirname, 'src/ts/content'),
				'@Background': path.resolve(__dirname, 'src/ts/background'),
				'@Client': path.resolve(__dirname, 'src/ts/client'),
			},
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					use: 'babel-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(css|scss|sass)$/,
					use: ['style-loader', 'css-loader', 'sass-loader'],
				},
			],
		},
	};
};
