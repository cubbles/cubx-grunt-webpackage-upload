'use strict';

var Uploader = require('cubx-webpackage-uploader');
var uploader = new Uploader();
var inquirer = require('inquirer');
var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {
  grunt.registerTask('_webpackages-bulk-upload', 'Upload several webpackages.', function () {
    // try to load the configs
    var workspacePath = grunt.config.get('workspacePath');
    var workspaceConfigPath = grunt.config.get('workspaceConfigPath');
    var activeWebpackage = grunt.config.get('activeWebpackage');

    var configFile;
    try {
      configFile = grunt.file.readJSON(workspaceConfigPath);
    } catch (err) {
    }
    if (!configFile || typeof configFile === 'undefined') {
      configFile = {
        activeWebpackage: ''
      };
    }

    var done = this.async();
    var choices = [];
    var webpackages = [];
    var uploadConfigs = grunt.config.get('workspaceConfig.uploadConfigs');

    // get all webpackages
    var webpackagesLoaded = function (err, files) {
      if (err) {
        grunt.fail.fatal(err);
      }
      files.forEach(function (file) {
        var pathName = path.join(workspacePath, file);
        if (fs.statSync(pathName).isDirectory()) {
          if (file === activeWebpackage && choices.length > 0) {
            choices.splice(0, 0, file);
          } else {
            choices.push(file);
          }
        }
      });

      // get list of webpackages to upload from config
      var uploadWebpackages = grunt.config.get('workspaceConfig.uploadWebpackages');
      var i = 0;

      if (uploadWebpackages && uploadWebpackages.length) {
        // create upload list from config
        grunt.log.writeln('Webpackages to upload:');
        for (i = 0; i < uploadWebpackages.length; i++) {
          if (choices.indexOf(uploadWebpackages[i]) >= 0) {
            webpackages.push(uploadWebpackages[i]);
            grunt.log.writeln((i + 1) + ') ' + uploadWebpackages[i]);
          }
        }
        startUploads();
      } else {
        // get user decision
        choices.push('CANCEL');
        grunt.log.writeln('Please select all webpackages to upload ' +
            'or to CANCEL: ');
        for (i = 0; i < choices.length; i++) {
          grunt.log.writeln((i + 1) + ') ' + choices[i]);
        }
        var options = {
          questions: [
            {
              name: 'selectedWebpackages',
              type: 'input',
              message: 'Answer:'
            }
          ]
        };

        inquirer.prompt(options.questions).then(webpackagesSelected);
      }
    };

    var webpackagesSelected = function (result) {
      // create upload list from user decision
      var list = [];
      list = result.selectedWebpackages.split(' ');
      if (list.indexOf((choices.indexOf('CANCEL') + 1).toString()) < 0) {
        for (var i = 0; i < list.length; i++) {
          if (choices[list[i] - 1]) {
            webpackages.push(choices[list[i] - 1]);
          }
        }
        startUploads();
      }
    };

    var startUploads = function () {
      if (webpackages.length) {
        if (uploadConfigs) {
          // start user interaction
          grunt.log.writeln('> Reading available configs from \'' + workspacePath + '\'');
          var options = require('../lib/upload-options.js')(grunt, uploadConfigs);
          inquirer.prompt(options.questions).then(uploadConfigLoaded);
        } else {
          // create uploadConfig
          grunt.log.warn('Upload configuration not found. Running a fix ... ');

          configFile.uploadConfigs = {
            dryRun: {
              url: 'https://cubbles.world/sandbox',
              proxy: '',
              dryRun: true
            },
            release: {
              url: 'https://cubbles.world/sandbox',
              proxy: ''
            }
          };
          grunt.file.write(workspaceConfigPath, JSON.stringify(configFile, null, 2));
          grunt.log.warn('Initial upload configuration now available at ' + workspaceConfigPath);
          grunt.log.warn('Please review the config and retry ...');
        }
      }
    };

    var uploadConfigLoaded = function (result) {
      // do upload, if user confirmed to do so
      if (result.selectedConfigKey !== 'CANCEL') {
        getCredentials(uploadConfigs[result.selectedConfigKey]);
      } else {
        done();
      }
    };

    var getCredentials = function (config) {
      inquirer.prompt([
        {
          name: 'user',
          type: 'input',
          message: 'username:',
          validate: function (input) {
            return (typeof input !== 'undefined' && input.length > 0);
          }
        },
        {
          name: 'password',
          type: 'password',
          message: 'password:',
          validate: function (input) {
            return (typeof input !== 'undefined' && input.length > 0);
          }
        }
      ]).then(function (response) {
        config.access_credentials = {
          user: response.user,
          password: response.password
        };
        doUpload(config, 0);
      });
    };

    var doUpload = function (selectedConfig, i) {
      // create the config expected by the uploader
      var uploadConfig = {
        source: path.join(workspacePath, webpackages[i]),
        target: {
          url: selectedConfig.url,
          proxy: selectedConfig.proxy
        },
        dryRun: selectedConfig.dryRun,
        debug: selectedConfig.debug
      };
      if (selectedConfig.access_credentials) {
        uploadConfig.access_credentials = selectedConfig.access_credentials;
      }
      // run the upload
      grunt.log.writeln('Starting upload ... ');
      uploader.uploadSingleWebpackage(uploadConfig, function (err, success) {
        if (err) {
          if (err.response && err.response.body) {
            grunt.fail.fatal(new Error(JSON.stringify(err.response.body, 'null', 2)));
            done();
            return;
          }
          grunt.fail.fatal(err);
          done();
        } else {
          grunt.log.ok('Success: ');
          grunt.log.ok(JSON.stringify(success, 'null', 2));
          i++;
          if (webpackages[i]) {
            doUpload(selectedConfig, i);
          } else {
            done();
          }
        }
      });
    };

    fs.readdir(workspacePath, webpackagesLoaded);
  });
};
