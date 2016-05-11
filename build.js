var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');
var WebpackDevServer  = require('webpack-dev-server');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var DefinePlugin      = webpack.DefinePlugin;
var UglifyJsPlugin    = webpack.optimize.UglifyJsPlugin;

var NODE_ENV          = process.env.NODE_ENV || 'production';
var PORT              = process.env.PORT || 3000;
var HOST              = process.env.HOST || '0.0.0.0';

var srcPath           = path.join(__dirname, '/src/');
var distPath          = path.join(__dirname, '/dist/');

console.log('Running ' + NODE_ENV + ' build...');

function getConfig(environment) {
  environment = environment || 'production';

  var config = {
    entry             : {
      main            : [path.join(srcPath, 'main.js')],
    },

    output            : {
      path            : distPath,
      filename        : '[name].[hash].js',
      publicPath      : '/',
    },

    plugins           : [
      new HtmlWebpackPlugin({
        title         : '',
        template      : path.join(srcPath, 'main.html'),
        inject        : true,
        filename      : 'index.html',
      }),
      new webpack.DefinePlugin({
        'process.env' : {
          NODE_ENV    : JSON.stringify(NODE_ENV),
          PORT        : JSON.stringify(PORT),
          HOST        : JSON.stringify(HOST),
        },
      }),
      new CopyWebpackPlugin([{
        from: path.join(srcPath, 'index.js'),
        force: true,
      }, {
        from: path.join(__dirname, 'package.json'),
        force: true,
      }]),
    ],

    resolve           : {
      extensions      : ['', '.js', '.css', '.scss', '.svg', '.png'],
      alias           : {
        'root'        : srcPath,
        'actions'     : path.join(srcPath, '/actions/'),
        'components'  : path.join(srcPath, '/components/'),
        'containers'  : path.join(srcPath, '/containers/'),
        'middlewares' : path.join(srcPath, '/middlewares/'),
        'reducers'    : path.join(srcPath, '/reducers/'),
        'sagas'       : path.join(srcPath, '/sagas/'),
        'constants'   : path.join(srcPath, '/constants/'),
        'services'    : path.join(srcPath, '/services/'),
        'images'      : path.join(srcPath, '/images/'),
      },
    },

    sassLoader: {
      includePaths    : [path.resolve(srcPath, "./constants")]
    },

    module            : {
      loaders         : [
        { test        : /\.js/,
          loaders     : ['babel'],
          include     : srcPath,
        },
        { test        : /\.scss/,
          loaders     : ['style', 'css', 'sass'],
        },
        { test        : /\.css/,
          loaders     : ['style', 'css'],
        },
        { test        : /\.svg|.png|.jpg|.eot|.ttf|.woff/,
          loader      : 'file',
        },
      ]
    },
  }

  if (environment === 'development') {
    config['devtool'] = 'source-map';
    config['output']['filename'] = '[name].js';

    return config;
  }

  config.plugins.push(
    new UglifyJsPlugin({
      compress  : { warnings : false },
      sourcemap : false,
      mangle    : true
    })
  );

  return config;
}

var compiler = webpack(getConfig(NODE_ENV));

if (NODE_ENV === 'development') {
  new WebpackDevServer(compiler, {
    contentBase : path.join(__dirname, 'dist'),
    noInfo: false,
    quiet: false,
    lazy: false,
    historyApiFallback: true,
    publicPath: '/',
    stats: {
      colors: true,
      chunks: false
    }
  })
  .listen(PORT, HOST, function(){
    console.log('Webpack Dev Server is listening on port', PORT);
  });
} else {
  compiler.run(function (err, stats) {
    if (err) throw err;

    console.log(stats.toString({
      colors : true,
      chunks : false
    }));
  });
}
