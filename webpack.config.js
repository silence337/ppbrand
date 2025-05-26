const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	//mode: 'production',
	entry: {
		ui:  path.resolve(__dirname, './assets/js/entry.js'),
	},
	output: {
		clean: true,
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		chunkFilename : 'js/[name].js' ,
		chunkFormat: 'commonjs',
	},
	target: ['web','es5'],
	module: {
	rules: [
		{
			test: /\.m?js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/env', {
								corejs: 2,
								useBuiltIns: 'usage',
								//debug: true,
								targets: { 
									"browsers": ["last 3 versions", "ie >= 11"],
									//"node": "current"
								},
								modules: false,
							}
						],
					],
					sourceType: "unambiguous",
					plugins: [
						'@babel/plugin-transform-runtime', 
						//'@babel/plugin-proposal-class-properties'
					]
				}
			}
		},

		{
			test: /.s?css$/,
			use: [
				
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						//publicPath: '../images/', // CSS in images path ( 아래 file-loader publicPath 와 중첩)
					},
				},
				'css-loader', 
				'sass-loader',
				// {
				// 	loader: "postcss-loader",
				// 	options: {
				// 		postcssOptions: {
				// 			plugins: [
				// 				[
				// 					"postcss-preset-env",
				// 					{
				// 					// Options
				// 					},
				// 				],
				// 			],
				// 		},
				// 	}
				// }
			  ],
		},

		{
			test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
			use: [
				{
					loader:'file-loader',
					options: {
						publicPath: '../images',  // CSS in images path
						outputPath:'./images/',
						name: '[name].[ext]',
						//name: '[name].[ext]?[hash]',
					}
				}
			]
		},
		],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist')]
		}),
		new HtmlWebpackPlugin({
			title: 'Fashion Brand example ',
			filename: 'index.html',
			template: './assets/index.html',
			hash: false,
			minify: true,
			scriptLoading: 'blocking'
		}),
		new CopyWebpackPlugin({'patterns': [
			{from:'./assets/images', to:'images'}
		]}),
	],
	devServer: {
		//contentBase: __dirname + "/dist/",
		static:{
			directory: path.join(__dirname, '/dist/'),
		},
		hot: false, // dist add hash file
		compress: true,
		open: true,
		client: {
			progress: true,
		},
		//progress: true,
		//watchContentBase: true,
		liveReload: true,
		//writeToDisk: true,
		// watchOptions: {
		//   ignored: /node_modules/
		// },
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin()
		],
		//splitChunks: false,
		// moduleIds: 'size',
		// removeAvailableModules: true,
		// mangleExports: true,
		// realContentHash: false,
		// concatenateModules: true,
		emitOnErrors: true
	},
	devtool: 'source-map',
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.json', '.jsx', '.css'],
	},
};