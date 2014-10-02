var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var qs = require('qs');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//Callback will be passed (err, data)
exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, {'encoding': 'utf8'}, function(err, data){
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urlArray){
    callback(_.contains(urlArray, url));
  });
};

exports.addUrlToList = function(url){
  exports.isUrlInList(url, function(found){
    if(!found){
      fs.appendFile(exports.paths.list, url+'\n', {'encoding':'utf8'}, function(err){
        if(err){
          console.log('Error addUrlToList ', err);
        }
      });
    }
  });
};

exports.isURLArchived = function(url){
  var path = exports.paths.archivedSites + url;
  return fs.existsSync(path);
};

exports.downloadUrls = function(){
};
