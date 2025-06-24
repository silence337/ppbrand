const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	entry:  './src/index.tsx',
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
			test: /\.(png|jpe?g|gif|webp|svg)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'images/[name][ext]' // 출력 경로 및 파일명 설정
			}
		},
		{
			test: /\.(js|jsx|ts|tsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react',
						{
							"runtime": "automatic" //JSX 자동 변환
						},
						'@babel/preset-typescript'
					],
				}
			}
		},

		{
			test: /.s?css$/,
			use: [
				
				{
					loader: MiniCssExtractPlugin.loader,
				},
				'css-loader', 
				'sass-loader',
			  ],
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
			template: './public/index.html',
			hash: false,
			minify: true,
			scriptLoading: 'blocking'
		}),
		new CopyWebpackPlugin({'patterns': [
			{from:'./public/images', to:'images'}
		]}),
	],
	devServer: {
		static:{
			directory: path.join(__dirname, '/dist/'),
		},
		hot: false, // dist add hash file
		compress: true,
		open: true,
		client: {
			progress: true,
		},
		liveReload: true,
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true, // console.* 제거
					},
					format: {
						comments: false, // 주석 제거
					},
				},
				extractComments: false, // 별도 LICENSE.txt 생성 방지
			})
		],
		emitOnErrors: true
	},
	devtool: 'source-map',
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
};