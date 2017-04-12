require('shelljs/global')
var hosting = require('./hosting')
var path = require('path')
var fs = require('fs')
var package = require('./package.json')

var packPath = path.resolve(__dirname, '__pack')

function execute(cmd, options) {
  return new Promise(function (resolve, reject) {
    var exec = require('child_process').exec;
    exec(cmd, options, function (err, stdout, stderr) {
      if (err) { reject(err); }
      resolve(stdout.trim());
    });
  });
}

function parseVersion() {
  var version = "";
  return execute('git branch').then(function (output) {
    var reg = /\*[^\d]*(\d*\.\d*\.\d*)/;
    if (!reg.test(output))
      throw new Error('未定义版本号');

    version = RegExp.$1;
    if (version == '')
      throw new Error('未定义版本号');

    if (version.split('.').length != 3)
      throw new Error('版本号定义错误, 定义规则: [主版片].[次版本].[修定版本]');

    return execute('git rev-list HEAD --count');
  })
    .then(function (commit) {
      var code = commit.toString();
      if (hosting.isDevelopment)
        code += '1';
      else
        code += '5';

      version = version + '.' + code;
      return Promise.resolve({
        name: version,
        code: code
      });
    })
}

function createMetadata() {
  var execSync = require('child_process').execSync
  var split = require('split-on-first-occurrence')
  var output = split(execSync('git log -n 1', { cwd: __dirname }).toString(), '\n\n')
  var info = output[0]
    .split('\n')
    .map(line => split(line, ' '))

  var result = { message: output[1].trim() }
  result.commit = info[0][1]

  console.log('Latest commit', result);
  var commitHash = result.commit.substr(0, 8);
  var data = {
    hash: commitHash
  };
  return data;
}

function updateManifest() {
  var manifestPath = path.resolve(packPath, 'manifest.json');
  var manifest = require(manifestPath);
  return parseVersion().then(function (version) {
    manifest.name = package.name;
    manifest.version.name = version.name;
    manifest.version.code = version.code;
    manifest.metadata = createMetadata();

    delete manifest.plus.distribute;
    delete manifest.unpackage;
    delete manifest.dependencies;

    return new Promise(function (resolve, reject) {
      fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8', function (err) {
        if (err) {
          reject(err);
        } else {
          console.log('保存成功: ' + manifestPath);
          resolve(version);
        }
      });
    })
  })
}

function z7(updatePath) {
  var manifestPath = path.resolve(packPath, 'manifest.json');
  var manifest = require(manifestPath);
  var version = manifest.version.name;
  var appname = manifest.name.toLowerCase();
  var hash = manifest.metadata.hash;
  var outputPath = updatePath + '/' + appname + '_' + version + '_' + hash + '.wgt';

  rm('-rf', outputPath);
  return execute('7z a -tzip ' + outputPath + ' *', { cwd: packPath })
    .then(function (output) {
      return Promise.resolve(outputPath);
    })
    .catch(function (error) {
      console.log(error);
      return
    });
}

function zip(updatePath) {
  var manifestPath = path.resolve(packPath, 'manifest.json');
  var manifest = require(manifestPath);
  var version = manifest.version.name;
  var appname = manifest.name.toLowerCase();
  var hash = manifest.metadata.hash;
  var outputPath = updatePath + '/' + appname + '_' + version + '_' + hash + '.wgt';

  rm('-rf', outputPath);
  return execute('zip -r ' + outputPath + ' *', { cwd: packPath })
    .then(function (output) {
      return Promise.resolve(outputPath);
    })
    .catch(function (error) {
      console.log(error);
      return
    });
}

function clean() {
  rm('-rf', packPath + '/*');
}

function copyBuild() {
  cp(path.resolve(__dirname, 'manifest.json'), packPath)
  cp('-rf', path.resolve(__dirname, 'build/*'), packPath)
}

function deployIos(iosPath) {
  return new Promise(function (resolve, reject) {
    fs.exists(iosPath, function (exists) {
      if (!exists)
        console.log('目录不存在: ' + iosPath);
      else {
        rm('-rf', iosPath + '/*');
        cp('-R', packPath + '/*', iosPath);
        console.log('打包成功: ' + iosPath);
      }
      return resolve();
    });
  });
}

function deployAndroid(androidPath) {
  return new Promise(function (resolve, reject) {
    fs.exists(androidPath, function (exists) {
      if (!exists)
        console.log('目录不存在: ' + androidPath);
      else {
        rm('-rf', androidPath + '/*');
        cp('-R', packPath + '/*', androidPath);
        console.log('打包成功: ' + androidPath);
      }
      return resolve();
    });
  });
}

function deployUpdate(updatePath) {
  return new Promise(function (resolve, reject) {
    fs.exists(updatePath, function (exists) {
      if (!exists)
        console.log('目录不存在: ' + updatePath);
      else {
        if (process.platform == 'win32') {
          z7(updatePath)
            .then(function (zipPath) {
              console.log('打包成功: ' + updatePath);
              resolve();
            })
            .catch(function (error) {
              reject(error);
            });
        } else {
          zip(updatePath)
            .then(function (zipPath) {
              console.log('打包成功: ' + updatePath);
              resolve();
            })
            .catch(function (error) {
              reject(error)
            });
        }
      }
    });
  });
}

function pack(argv) {
  rm('-rf', packPath);
  mkdir(packPath);
  clean();
  copyBuild();

  updateManifest()
    .then(function () {
      if (argv.ios)
        return deployIos(path.resolve(__dirname, argv.ios));
      else
        return Promise.resolve();
    })
    .then(function () {
      if (argv.android)
        return deployAndroid(path.resolve(__dirname, argv.android));
      else
        return Promise.resolve();
    })
    .then(function () {
      if (argv.update)
        return deployUpdate(path.resolve(__dirname, argv.update), argv.z7);
      else
        return Promise.resolve();
    })
    .catch(function (error) {
      console.log(error);
    });
}

pack(require('optimist').argv);
