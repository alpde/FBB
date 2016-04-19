//var cool = require('cool-ascii-faces');
//http://stackoverflow.com/questions/36667187/getting-and-error-wrong-validation-token-when-trying-to-create-a-facebook-cha
var request = require("request");
//
var express = require('express');
//http://stackoverflow.com/questions/36614865/facebook-messenger-api-cant-get-post-requests
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();

//
app.set('port', (process.env.PORT || 5000));
//
app.use(express.static(__dirname + '/public'));
//
//// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//
////app.get('/', function(request, response) {
////  response.render('pages/index')
////});
////facebook
////app.get('/webhook', function (req, res) {
////  if (req.query['hub.verify_token'] === messenger_bots_token) {
////    res.send(req.query['hub.challenge']);
////  } else {
////    res.send('Error, wrong validation token');    
////  }
////});
//
////facebook 2
//app.get('/webhook/', function (req, res) {
//  if (req.query['hub.verify_token'] === 'messenger_bots_token') {
//    res.send(req.query['hub.challenge']);
//  }
//  res.send('Error, wrong validation token');
//})
//
//
//// test
//app.get('/', function(request, response) {
//  var result = ''
//  var times = process.env.TIMES || 5
//  for (i=0; i < times; i++)
//    result += cool();
//  response.send(result);
//});
////test
//app.get('/cool', function(request, response) {
//  response.send(cool());
//});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log('HEEEY');
});
//
//////add database 
////var pg = require('pg');
////
////app.get('/db', function (request, response) {
////  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
////    client.query('SELECT * FROM test_table', function(err, result) {
////      done();
////      if (err)
////       { console.error(err); response.send("Error " + err); }
////      else
////       { response.render('pages/db', {results: result.rows} ); }
////    });
////  });
////})
////// end 
//
//// facebook send
//
//
//var token = "CAALh5TgiZCA8BAHTv2Mb03qZBY1oG2R3LMDZAAb9d02iyZA5CWdn7RkQ5DgntLO7iTh2zIgzjmXJOL9CXIDkYiIOyAqRauzxUzs35MqT03U6Q7nLmZBputixxHIdsmkimrjheJwZCSHU1dLzaryCXbwHui7VfGtZB65UTcmmmiZCBxpurztuTX9G3BbLVQIWdp8ZD";
//
//function sendTextMessage(sender, text) {
//  messageData = {
//    text:text
//  }
//  request({
//    url: 'https://graph.facebook.com/v2.6/me/messages',
//    qs: {access_token:token},
//    method: 'POST',
//    json: {
//      recipient: {id:sender},
//      message: messageData,
//    }
//  }, function(error, response, body) {
//    if (error) {
//      console.log('Error sending message: ', error);
//    } else if (response.body.error) {
//      console.log('Error: ', response.body.error);
//    }
//  });
//}
///// facebook end send back
//// facebook POST
//
//app.post('/webhook/', function (req, res) {
//  messaging_events = req.body.entry[0].messaging;
//  for (i = 0; i < messaging_events.length; i++) {
//    event = req.body.entry[0].messaging[i];
//    sender = event.sender.id;
//    if (event.message && event.message.text) {
//      text = event.message.text;
//      // Handle a text message from this sender
//        // dit gaat het terug sturen
//         sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
//    }
//  }
//  res.sendStatus(200);
//});
//
//
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'messenger_bots_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token' + req.query['hub.challenge'] + 'HELLLO');
  
})

//app.post('/webhook/', function (req, res) 
app.post('/webhook/', jsonParser, function(req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

var token = "CAALh5TgiZCA8BACwyZB6YD9lvCFzOMN1a8sHbtvOaFEjMlHgmidzD3KbKKYvHrGNZAtLUqGUoOioX7Rr4ThxyNEM5r0wY75CcT8Q0erZBJLB7HtS7M1GTQx5VjsiVRZBiwFQcDtp7Q3RAGpE4VRwQqZBSvY2Mng6S2ZAF81ZA0JZATYJepdDZBIIFT0Q6ZCPkZBBBXQZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}
