var path = require("path");
var baseDir = process.cwd();
var srcDir = path.resolve(baseDir, 'src');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function () {
  var extendConf = {
    module: {
      rules: []
    },
      resolve:{
          //配置别名，在项目中可缩减引用路径
          alias: {
              "components": path.resolve(srcDir, 'scripts/components'),
              "@": path.resolve(srcDir, 'scripts'),
          }
      },
  };
  return extendConf;
};