const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const WebSocket = require('ws');

const sendData ={
                    
    eventName : "response",
    item: "Pet",
    inputTrash: "0",
    recyclingTrash: "0",
    recyclingRate: "0",
    uptime:"0"
    
};

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/recycledata', require('./routes/recycledata'));
app.use('/api/push', require('./routes/pushnotification'))
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
 
});

//Unity-Server Socket-cummunication

const wss = new WebSocket.Server({ port: 8080 },()=>{
  console.log('server started')
  })
 
  //unity로부터 받은 데이터 출력
  wss.on('connection', function connection(ws){
      ws.on('message', (message) =>{
             
             // console.log('data received \n %o', msg.inputTrash) //유니티로부터 받은 데이터 출력
              
             let recData = JSON.parse(message);                       
                      switch(recData.eventName){
                          case 'open':
                              console.log("open socket!!");                                
                              setInterval(() => {                                    
                                  ws.send(JSON.stringify(sendData));                               
                              }, 1000)
                              break;
                          case 'getUnity':
                              
                              sendData.item = recData.item
                              sendData.inputTrash = recData.inputTrash
                              sendData.recyclingTrash = recData.recyclingTrash
                              sendData.recyclingRate = recData.recyclingRate
                              sendData.uptime= recData.uptime
                              // console.log(sendData)
                              ws.send(JSON.stringify(sendData));
                              break;
                      }
                      //ws.send(data);// 서버에서 유니티로 전송
                      
                          })
                          })

                          //서버가 잘 시작되면
                          wss.on('listening', ()=>{
                              console.log('listening on 8080')
                              })
