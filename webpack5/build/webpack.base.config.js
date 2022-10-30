const { resolve } = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const EslintWebpackPlugin = require('eslint-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')

const { entry } = require('./entryGenerator')

module.exports = {
  target: 'web',
  entry,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:8].js'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      // 'vue$': ''
    },
    extensions: ['.js', '.jsx', '.vue', '.json']
  },
  optimization: {
    // 标记未被使用的代码
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],

    // 副作用
    sideEffects: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.md$/i,
      //   use: {
      //     loader: '',
      //     options: {
      //       size: 20,
      //     }
      //   }
      // },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[c|a]ss$/i,
        use: [
          // 'vue-style-loader', 
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',  // 按需加载
                  corejs: 3,             // 最新版本
                  // targets: {
                  //   chrome: '58',
                  //   ie: 9
                  // },                 // 配置 运行环境
                  targets: "defaults",
                  modules: "commonjs"
                }
              ],
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
          }
        }
      },
      {
        test: /\.tsx?$/i,
        use: ['ts-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(png|gif|webp|jpe?g)$/i,
        type: 'asset',
        // 自定义默认大小
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        // 指定打包位置
        generator: {
          filename: "image/[name].[ext]"
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css'
    }),
    new StylelintWebpackPlugin({
      files: ['src/**/*{css,less,scss,sass,vue}']
    }),
    
    // new EslintWebpackPlugin({
    //   fix: true
    // }),

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "src/public",
    //       to: "public"
    //     }
    //   ]
    // }),

    new CleanWebpackPlugin()
  ]
}