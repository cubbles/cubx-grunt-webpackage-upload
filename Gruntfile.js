/*
 * grunt-cubx-webpackage-upload
 *
 * Copyright (c) 2015 Hd Böhlau
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');

module.exports = function (grunt) {
  // Project configuration.
  var workspacePath = 'test/webpackages';
  var workspaceConfigPath = 'test/webpackages/.workspace';
  var activeWebpackageConfigPath = path.join('test/webpackages', 'my-package', '.webpackage');
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: [ 'tmp' ]
    },

    // Unit tests.
    nodeunit: {
      tests: [ 'test/*_test.js' ]
    },

    // the option used within the devtools to load the workspace-config
	workspacePath: workspacePath,
    workspaceConfigPath: workspaceConfigPath,
    workspaceConfig: grunt.file.readJSON(workspaceConfigPath),
    //
    activeWebpackageConfigPath: activeWebpackageConfigPath,
    activeWebpackageConfig: grunt.file.readJSON(activeWebpackageConfigPath)

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
};
