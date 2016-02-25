/*global module,require*/
'use strict'

module.exports = function (grunt, uploadConfigs) {
  var uploadConfigChoices = []
  Object.keys(uploadConfigs).forEach(function (configKey) {
    var string = configKey + ': ' + JSON.stringify(uploadConfigs[ configKey ]).replace(/,/g, ', ')
    uploadConfigChoices.push(string)
  })
  uploadConfigChoices.push('CANCEL')
  return {
    questions: [
      {
        name: 'selectedConfigKey',
        type: 'rawlist',
        message: 'Please type the index of your choice to SELECT A CONFIG or to CANCEL the upload: ',
        choices: uploadConfigChoices,
        filter: function (val) {
          if (val.indexOf('CANCEL') === 0) {
            return 'CANCEL'
          }
          // return the configKey
          return val.substring(0, val.indexOf(':'))
        }
      }
    ]
  }
}
