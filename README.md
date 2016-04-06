# cubx-grunt-webpackage-upload

> Grunt integration to upload a cubbles-webpackage into a cubbles-base

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
    dev: {
      url: "http://loalhost:8080/sandbox",
      proxy: "",
      debug: false
    },
    release: {
      url: "https://cubbles.mycompany.net/releases",
      proxy: "",
      debug: false
    }
  }
```

### Options

#### uploadConfigs.{configName}
Type: `string`

A key to identify the uploadConfig.

#### uploadConfigs.{configName}.url
Type: `string`
Default value: `'https://webblebase.net/sandbox'`

A url pointing to a named store (here 'sandbox') within a cubbles-base.

#### uploadConfigs.{configName}.proxy
Type: `string`
Default value: `''`

A proxy url, if you are behind a proxy.

#### uploadConfigs.debug
Type: `boolean`
Default value: `'false'`

Log into the console on debug -level. 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
