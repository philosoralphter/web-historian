// var http = require('http');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var qs = require('qs');

exports.handleRequest = function (req, res) {
  if(req.url === '/'){
    if(req.method === 'GET'){
      res.writeHead(200);
      var path = archive.paths.siteAssets + '/index.html';
      fs.readFile(path, 'utf8', function(err, data){
        res.end(data);
      });
      return;
    } else if(req.method === 'POST'){
      req.on('data', function(data){
        var url = data.toString().split('=')[1];
        archive.addUrlToList(url);

        if(archive.isURLArchived('/'+url)){
          res.writeHead(302, {"Location": '/'+url});
          res.end();
        } else {
          res.writeHead(302, {"Location": '/'+url});
          res.end();
          return;
        }
      });
    }
  } else if(req.url.match(/\/www./)){
    if(archive.isURLArchived(req.url)){
      var path = archive.paths.archivedSites + req.url;
      fs.readFile(path, 'utf8', function(err, data){
        res.writeHead(200);
        res.end(data);
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if(req.url === '/loading'){
    if(req.method == 'GET'){
      res.writeHead(200);
      var path = archive.paths.siteAssets + '/loading.html';
      fs.readFile(path, 'utf8', function(err, data){
        res.end(data);
      });
      return;
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    res.writeHead(404);
    res.end();
  }
};
