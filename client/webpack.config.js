var webpack = require( 'webpack' ),
    // paths
    path = require( 'path' ),
    scriptsBase = path.join( __dirname, 'galaxy/scripts' ),
    libsBase = path.join( scriptsBase, 'libs' ),

    // libraries used on almost every page
    // TODO: reduce
    commonLibs = [
        'polyfills',
        // jquery et al
        'jquery',
        'libs/jquery/jquery.migrate',
        // jquery plugins
        'libs/jquery/select2',
        'libs/jquery/jquery.event.hover',
        'libs/jquery/jquery.form',
        'libs/jquery/jquery.rating',
        'libs/jquery.sparklines',
        'libs/jquery/jquery-ui',
        'libs/bootstrap',
        'libs/bootstrap-tour',
        'libs/jquery.complexify',
        'libs/jquery/jquery.autocomplete',
        // mvc
        'libs/underscore',
        'libs/backbone',
        // all pages get these
        'ui/autocom_tagging',
        'layout/modal',
        'layout/panel',
        'onload',
    ];


module.exports = {
    devtool : 'source-map',
    entry   : {
        libs    : commonLibs,
        login   : './galaxy/scripts/apps/login.js',
        analysis: './galaxy/scripts/apps/analysis.js',
        admin   : './galaxy/scripts/apps/admin.js',
    },
    output  : {
        path        : __dirname + '/../static/scripts/bundled',
        filename    : '[name].bundled.js'
    },
    resolve : {
        modules: [ scriptsBase ],
        alias : {
            //TODO: correct our imports and remove these rules
            // Backbone looks for these in the same root directory
            jquery      : path.join( libsBase, 'jquery/jquery' ),
            underscore  : path.join( libsBase, 'underscore.js' ),
        }
    },
    module : {
        loaders : [ { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    compact: false,
                },
            },
        ],
    },
    resolveLoader: {
        alias: {
            i18n: "amdi18n-loader"
        }
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin( { 'name': 'libs', 'filename': 'libs.bundled.js' } ),
        // this plugin allows using the following keys/globals in scripts (w/o req'ing them first)
        // and webpack will automagically require them in the bundle for you
        new webpack.ProvidePlugin({
            $:                  'jquery',
            jQuery:             'jquery',
            'window.jQuery':    'jquery',
            _:                  "underscore",
            Backbone:           'libs/backbone',
        }),
        // new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
    ],
};
