var template = '{"attachment": {"type": "template","payload": {"template_type": "generic","elements":[{"title": "First card","subtitle": "Element #1 of an hscroll","image_url": "http://messengerdemo.parseapp.com/img/rift.png","buttons": [{"type": "web_url","url": "https://www.messenger.com/","title": "Web url"}, {"type": "postback","title": "Postback","payload": "Payload for first element in a generic bubble",}],},{"title": "Second card","subtitle": "Element #2 of an hscroll","image_url": "http://messengerdemo.parseapp.com/img/gearvr.png","buttons": [{"type": "postback","title": "Postback","payload": "Payload for second element in a generic bubble",}],}]}}}';
var request = require("request");

var express = require('express');

var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log('HEEEY');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'messenger_bots_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token' + req.query['hub.challenge'] + 'HELLLO');
  
})
app.post('/webhook/', jsonParser, function(req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
        if(text === "hello"){text = "Hi hello, hoe is het"}
        if(text === "temp"){text = "template"}

//        sendTextMessage(sender, text.substring(0, 200));
        sendTextMessage(sender, text,template);
    }
  }
  res.sendStatus(200);
});

var token = "CAALh5TgiZCA8BACwyZB6YD9lvCFzOMN1a8sHbtvOaFEjMlHgmidzD3KbKKYvHrGNZAtLUqGUoOioX7Rr4ThxyNEM5r0wY75CcT8Q0erZBJLB7HtS7M1GTQx5VjsiVRZBiwFQcDtp7Q3RAGpE4VRwQqZBSvY2Mng6S2ZAF81ZA0JZATYJepdDZBIIFT0Q6ZCPkZBBBXQZD";

function sendTextMessage(sender, text, temp) {
  def_val = '{"text":"foutje bedankt text: geen waarde aan temp mee gegeven"}';     
  messageData = (temp === undefined) ? JSON.parse(def_val) : temp;
//  messageData = {
//    text:text
//  }
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
