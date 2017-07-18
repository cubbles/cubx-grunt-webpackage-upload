/* global module,require */
'use strict';
var Uploader = require('cubx-webpackage-uploader');
var uploader = new Uploader();
var inquirer = require('inquirer');
var path = require('path');

module.exports = function (grunt) {
  // define an task starting with '+' if your task should be listed as one of the main top tasks
  grunt.registerTask('+webpackage-upload', 'Upload a Cubbles-Webpackage into a Cubbles-Base.', function () {
    // try to load the config
    var webpackageConfigPath = grunt.config.get('activeWebpackageConfigPath');
    var uploadConfigs = grunt.config.get('activeWebpackageConfig.uploadConfigs');
    if (uploadConfigs) {
      // Force into async mode and grab a handle to the "done" function.
      var done = this.async();
      var doUpload = function (selectedConfig) {
        // create the config expected by the uploader
        var uploadConfig = {
          source: path.dirname(webpackageConfigPath),
          target: {
            url: selectedConfig.url,
            proxy: selectedConfig.proxy
          },
          dryRun: selectedConfig.dryRun,
          debug: selectedConfig.debug
        };
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
            done();
          }
        });
      };
      // start user interaction
      grunt.log.writeln('> Reading available configs from \'' + webpackageConfigPath + '\'');
      var options = require('../lib/upload-options.js')(grunt, uploadConfigs);
      inquirer.prompt(options.questions).then(function (result) {
        // do upload, if user confirmed to do so
        if (result.selectedConfigKey !== 'CANCEL') {
          doUpload(uploadConfigs[ result.selectedConfigKey ]);
        } else {
          done();
        }
      });
    } else {
      // create uploadConfig
      grunt.log.warn('Upload configuration not found. Running a fix ... ');
      var configFilePath = grunt.config.get('activeWebpackageConfigPath');
      var webpackageConfig = grunt.file.readJSON(configFilePath);
      webpackageConfig.uploadConfigs = {
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
      grunt.file.write(configFilePath, JSON.stringify(webpackageConfig, null, 2));
      grunt.log.warn('Initial upload configuration now available at ' + configFilePath);
      grunt.log.warn('Please review the config and retry ...');
    }
  });
};
