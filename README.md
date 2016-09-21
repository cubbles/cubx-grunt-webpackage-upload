# cubx-grunt-webpackage-upload

[![npm][npm-image]][npm-url]

Grunt integration to upload a cubbles-webpackage into a cubbles-base.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install cubx-grunt-webpackage-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('cubx-grunt-webpackage-upload');
```

## The "+webpackage-upload" task

### Overview
In your webpackage, the following config is expected to be found in the _.webpackage_ file. If its is not found, 
it will be created when running the task the first time.

```js
  uploadConfigs: {
    dryRun: {
      url: 'https://cubbles.world/sandbox',
      proxy: '',
      dryRun: true
    },
    release: {
      url: 'https://cubbles.world/sandbox',
      proxy: ''
    }
  }
```

### Options

#### uploadConfigs.{configName}
Type: `string`

A key to identify the uploadConfig.

#### uploadConfigs.{configName}.url
Type: `string`
Default value: `'https://cubbles.world/sandbox'`

A url pointing to a named store (here 'sandbox') within a cubbles-base.

#### uploadConfigs.{configName}.proxy
Type: `string`
Default value: `''`

A proxy url, if you are behind a proxy.

#### uploadConfigs.{configName}.dryRun
Type: `boolean`
Default value: `false`

Setting the value to `true` executes the upload procedure (including authentication and permissions check) without any data transfer.
  The result contains a list of files that would be uploaded - as well as a list of files the will be ignored from an upload. So a _dryRun_ is perfect to check the configuration of your (optional) _.cubblesignore_ file of your webpackage.

#### uploadConfigs.{configName}.debug
Type: `boolean`
Default value: `false`

Log into the console on debug -level. 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
