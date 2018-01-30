var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var messages = [{id: 1,title: 'Breaking news from today', subTitle: 'Subtitle Breaking news from today', text: 'Some text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Tim123', img: 'http://www.bmvbespoke.com/files/2213/5050/1151/news.jpg', featured: true },
 { id: 2, title: 'Breaking news from today morning', subTitle: 'Super Subtitle Breaking', text: 'Other Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Jane456', img: 'http://www.aanthonycorp.com/wp-content/uploads/2014/09/breaking-news-qzzamuvt.jpg' , featured: false }, 
 { id: 3, title: 'Nothing important',subTitle: 'From today', text: 'Latest news Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Pawwel', img: 'http://dodablue.com/images/categories/Tech-News.jpg' , featured: false }, 
 { id: 4, title: 'What happenend yesterday ', subTitle: 'Breaking news', text: 'Braking news Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Lena', img: 'https://ichef.bbci.co.uk/images/ic/1920x1080/p03fghm2.jpg' , featured: false },
 { id: 5, title: 'Test Breaking news from today morning', subTitle: 'Super Subtitle Breaking', text: 'Other Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Jane456', img: 'https://www.ncp.co.uk/uploads/home/82.jpg?version=20180102131738' , featured: false }, 
 { id: 6, title: 'Todays Breaking news from today morning', subTitle: 'Super Subtitle Breaking', text: 'Other Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Jane456', img: 'http://globalmedicalco.com/photos/globalmedicalco/19/91563.jpg' , featured: false }, 
 { id: 7, title: 'Seventh Breaking news from today morning', subTitle: 'Super Subtitle Breaking', text: 'Other Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Jane456', img: 'https://static.businessinsider.com/image/5995d46db0e0b525008b5bb9/image.jpg' , featured: false },
 { id: 8, title: 'Todays Breaking Sport', subTitle: 'Super Subtitle Breaking', text: 'Other Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Jane456', img: 'http://d3vlf99qeg6bpx.cloudfront.net/content/uploads/2017/08/01100804/Man-Utd-squad.jpg' , featured: false }, 
 { id: 9, title: 'Manchester news', subTitle: 'Super Subtitle Breaking', text: 'Other Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', owner: 'Jane456', img: 'http://www.ronaldo7.net/news/2018/01/1310-cristiano-ronaldo-stays-at-real-madrid.jpg' , featured: false }];

 var users = [{ firstName: 'a', email: 'a@a.com', password: 'aaa', id: 0 }];

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

var api = express.Router();
var auth = express.Router();
// get all messages
api.get('/messages', (req, res) => {
    res.json(messages);
})
//get messages by user name
api.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    var result = messages.filter(message => message.owner == user);
    res.json(result);
})
//get message by id
api.get('/getMsg/:id', (req, res) => {
   var id = req.params.id;
   var result = messages.filter(message => message.id == id);
   res.json(result)
})
//post message
api.post('/messages', (req, res) => {
    messages.push(req.body);
    res.json(req.body);
})

api.get('/users/me', checkAuthenticated, (req, res) => {
    res.json(users[req.user]);
})

api.post('/users/me', checkAuthenticated, (req, res) => {
    var user = users[req.user];
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    res.json(user);
})

auth.post('/login', (req, res) => {
    var user = users.find(user => user.email == req.body.email);

    if (!user)
        sendAuthError(res);

    if (user.password == req.body.password)
        sendToken(user, res);
    else
        sendAuthError(res);
})
auth.post('/register', (req, res) => {
    var index = users.push(req.body) - 1;
    var user = users[index];
    user.id = index;
    sendToken(user, res);

})

function sendToken(user, res) {
    // hardcoded secret not for production use!!!
    var token = jwt.sign(user.id, '123');
    res.json({ firstName: user.firstName, token });
}

function sendAuthError(res) {
    return res.json({ success: false, message: 'email or password incorrect' });
}

function checkAuthenticated(req, res, next) {
    if (!req.header('authorization'))
        return res.status(401).send({ message: 'Unauthorized requested. Missing authentication header' });

    var token = req.header('authorization').split(' ')[1];

    var payload = jwt.decode(token, '123');

    if (!payload)
        return res.status(401).send({ message: 'Unauthorized requested. Authentication header invalid' });

    req.user = payload;

    next();
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);