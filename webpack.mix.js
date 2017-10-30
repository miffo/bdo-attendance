let mix = require('laravel-mix');
let webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/assets/ts/main.ts', 'public/js')
    .webpackConfig({
        plugins: [
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/,
                path.resolve('./src'),
                {}
            ),
            new webpack.SourceMapDevToolPlugin({
                "filename": "[file].map[query]",
                "moduleFilenameTemplate": "[resource-path]",
                "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
                "sourceRoot": "webpack:///"
            })
        ]/*,
        
        "module": {
            "rules": [

                {
                    "test": /\.ts$/,
                    "loader": "@ngtools/webpack"
                }
            ]
        }*/
    });
   //.sass('resources/assets/sass/app.scss', 'public/css');
