var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
//var axios = require('axios');
const { response } = require('express');
var cryptodata = {};
var cname = [];
var cvalue = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CryptoExplorer' });
});
router.get('/getpage', function(req, res, next) {
  res.render('try', { title: 'try success' });
});
router.get('/getcrypto', function(req, res, next) {
  res.render('crypto', { title: 'try crypto' });
});
router.post('/cryptograph', function(req, res, next) {
  console.log("called crypto");
 var name=req.body.first_name;

  res.render('crypto', { title: name });
});

router.get('/sample/getdata', async function(req, res, next) {
  global.temp1=0.00;
   global.temp2=0.00;
 request('https://coinmarketcap.com/', async (Error,response,html)=>{
  
 if (!Error && response.statusCode == 200) {
  cvalue=[];  
      const $ =  cheerio.load(html);
      const rows =  $('table tr');
      for (i = 1; i < 4; i++) {
        tddata =  $(rows[i]).children('td');
        for (j = 0; j < 4; j++) {
            naam="";
            value="";
            if (j==2) {naam=  $(tddata[j]).first('p').text().toString();
          //console.log(naam);
        }
            if (j==3){value1= $(tddata[j]).text().replace('$','');
            value=value1.replace(',','');
            //console.log(value);
          }
        }
          cname.push(naam);
          cvalue.push(value);
          //console.log(typeof(cname),"  ",typeof(cvalue));
        
      }
     
      temp1=parseFloat(cvalue[0]);
    //console.log(temp1,"temp1");
    
      temp2=parseFloat(cvalue[1]);
    //console.log(temp2, "temp2");
    
    }
    //console.log(temp2,"again temp 2",typeof(temp2));
    var b="b";
    var e="e";
    cryptodata={ 
      b : temp1,
      e  : temp2};
  
    //console.log(cryptodata," c-bala");
     return res.send(cryptodata);

    });
    //console.log(temp2);
    
    var data={  
      "b" : temp1,
      "e"  : temp2
    }
    console.log(cryptodata,"cryptodata");
    
  });

module.exports = router;
