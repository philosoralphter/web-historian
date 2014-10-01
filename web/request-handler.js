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

      var url;
      req.on('data', function(data){
        url = qs.parse(data).url;
      });

      res.writeHead(302);
      archive.addUrlToList(url);
      res.end();
      return;
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
  } else {
    res.writeHead(404);
    res.end();
  }
};
