var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var FCM = require('fcm-node');
var serverKey = 'AIzaSyBih6Ht750qfInlKVjziwaFXd0SdufMR2c';
var fcm = new FCM(serverKey);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3001;

var router = express.Router();

router.get('/', function(req, res) {
    res.render('../index.html');   
});

router.post('/api/sendNotification',function(req,res){
	var message = {
	    to: '/topics/pings', 
	    data: {
	        message: req.body.message,
	        senderId: req.body.senderId,
	        restKey: req.body.restKey
	    }
	};
	fcm.send(message, function(err, response){
	    if (err) {
	        res.json(err.toString());
	    } else {
	    	res.json("ok");
	    }
	});
	
});

app.use('', router);



app.listen(port);