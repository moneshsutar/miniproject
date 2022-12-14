
let express = require('express')
let ejs = require('ejs')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let bluebird = require('bluebird')
const path=require('path')
// let YOUR_ACCOUNT_SID="AC55a6eba2312df32e4045f25321cd7cf7"
// let YOUR_AUTH_TOKEN="ceb1e15c3a9459672a64163012dbac1c"
// const client = require('twilio')(YOUR_ACCOUNT_SID, YOUR_AUTH_TOKEN);



mongoose.Promise = bluebird;
let app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoDB='mongodb+srv://irannapatil:IrannaPatil@cluster0.nczi5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
let mainRoutes = require('./router/main')
app.use(mainRoutes)

app.use(express.static(__dirname + '/public'));

// index page

  
  // app.get('/',(req,res)=>{
  //     res.render('index')
  // });

app.listen(3000, () => {
    console.log('Runing on port ' + 3000)
})