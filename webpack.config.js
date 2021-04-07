const path=require('path');
const webpack=require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin}=require('clean-webpack-plugin')

module.exports={
    devtool: 'source-map',
    entry:{
       vendor:['react','react-dom',
       'redux','react-redux',
       'react-router-dom','redux-thunk','redux-logger','react-router-redux','timeago-react','react-scroll-to-bottom',
  'axios','jquery','@material-ui/core','image-compressor.js','@material-ui/icons','react-autosuggest','react-chips','react-datepicker','react-select','react-linkify'],
        app:'./src/index.js'
    },
     output:{
        filename:"[name].bundle.js",
        path:path.join(__dirname,"public"),
        publicPath:'/'
    },  
    
    module:{
        rules:[
            {
            test:/\.js$/,
             exclude:/(node_modules)/,
             use:{
                 loader:'babel-loader',
                 options:{
                     presets:["react","es2015","stage-2"]
                 }
             }   
            
            },
            {
                test:/\.css$/,
                 use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'} 
                ]
            },{
                test:/\.jsx$/,
                loader:'jsx-loader'
            }
            ,{

                test:/\.scss$/,
                
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'sass-loader'}
                ]
            }
            ,{

                test:/\.less$/,
                include:/node_modules/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.ttf$/,
                use:[
                    {
                        loader:'ttf-loader',
                        options:{
                            name:'/font/[hash].[ext]'
                        },
                    },
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use:[
                  'url-loader?limit=100000',
                  'img-loader',
                  'file-loader?name=/icons/[name].[ext]'
                ]
              },
              {test: /\.(eot|woff|woff2)$/, 
                loader: "file-loader"}
            ]
    },
    // optimization: {
    //     splitChunks: {
    //       chunks: 'async',
    //       minSize: 30000,
    //       maxSize: 0,
    //       minChunks: 1,
    //       maxAsyncRequests: 6,
    //       maxInitialRequests: 4,
    //       automaticNameDelimiter: '~',
    //       automaticNameMaxLength: 30,
    //       cacheGroups: {
    //         defaultVendors: {
    //           test: /[\\/]node_modules[\\/]/,
    //           priority: -10
    //         },
    //         default: {
    //           minChunks: 2,
    //           priority: -20,
    //           reuseExistingChunk: true
    //         }
    //       }
    //     }
    // },
    plugins:[
        // new webpack.ProgressPlugin(),
        new CleanWebpackPlugin({dry: true}),
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    ]
}        
