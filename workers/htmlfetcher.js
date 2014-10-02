// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var CronJob = require('cron').CronJob;
var helpers = require('../helpers/archive-helpers.js');

exports.start = function(){
  console.log('scheduled cron job');
  new CronJob('*/1 * * * *',  function(){
      helpers.readListOfUrls(function(array){
        for(var i=0; i<array.length; i++){
          if(!helpers.isURLArchived(array[i])){
            helpers.downloadUrls(array[i]);
          }
        }
      });
  }, null, true, null);
};
