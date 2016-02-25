# Release History

## 1.6.1
* BugFix version 
** updated dependency cubx-webpackage-uploader to version 2.6.1

## 1.6.0
* modelVersion 8.3.0
* updated dependency cubx-webpackage-uploader to version 2.6.0

## 1.5.0
* modelVersion 8.2
* updated dependency cubx-webpackage-uploader to version 2.5.0

## 1.4.0 Dependencies updated
Refers to _cubx-wepackage-uploader-2.4.0_ with changed behaviour to finish an upload.

## 1.3.0 Ready for use with multiple and named-stores.
Config now is located within the _.webpackage_ file within your _webpackages/{webpackagename}_ folder.

The config 

* contains 1..n named-configurations,
* does not longer contain a 'source' property.

Starting the upload task, the user is requested to select one of the named-configs OR to cancel the upload.

## 1.2.0 Dependencies updated
Refers to the latest version of the uploader-package using the latest document-api for schema-validation.

## 1.1.0 Dependencies updated
Refers to the latest version of the uploader-package.

## 1.1.0 Dependencies updated
Switch to versioned cubbles-dependencies. 

## 0.1.0 Initial Release
Automatically creates a task, to be used to upload a single webpackage.
The config is expected within the _.workspace_ file within your _{projectname}/webpackages_ folder.
