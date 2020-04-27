const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const Tesseract = require('tesseract.js');
var fs = require('fs');
//var images = new images();
var PNG = require('png-js');
var QrCode = require('qrcode-reader');
const images = require('../ITCD-Cigniti/images');

//middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded ({ extended : true}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json());

const PORT = process.env.PORT | 5000;

var Storage = multer.diskStorage({
  dest: (req, recfile, callback) => {
    callback(null, __dirname + '/images');
  },
  filename: (req, recfile, callback) => {
    callback(null, recfile, originalname);
  }
});

var upload = multer({
  storage: Storage
}).single('images');

var upload = multer({dest: './upload'});
var type = upload.single('file');

//routes
app.get('/', (req, res) => {
  res.render('index');
})

app.post('/upload', upload.single('file'), function (req, res) {
  console.log(req.file);
  res.send('file saved on server');
    var images = fs.readFileSync(
      __dirname + '/images.jpeg' + '/images.jpg' +'/images.png' + req.file.originalname,
      {
        encoding: null
      }
    );
    Tesseract.recognize(images)
    .progress(function(p){
      console.log('progress', p)
    })
    .then(function(result) {
    res.send(result.html);
    });
});

// app.post('/upload', multer(multerConfig).single('myfile'),function(req, res){
//   console.log(req.file);
//   res.sendStatus(200)
//   Tesseract.recognize(image)
//   .progress(function(p){
//     console.log('progress', p)
//   })
//   .then(function(result){
//     res.send(result.html)
//   })
// });

app.get('/showdata', (req, res) => {});

app.listen(PORT, () =>{
  console.log(`Server running on Port ${PORT}`)
});
