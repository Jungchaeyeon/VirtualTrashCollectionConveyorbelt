const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("../client/public/key/firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//=========================================
//             PushNotification
//=========================================

router.post("/sendMessage", (req, res) => {
    var fcm_target_token = "dwNyNQZNRNCuDznb_whlzR:APA91bGv7_wCmqOL-HhXMp2y0yLL4_vNoKLLf6niuqmn6USsSL_rOo-t43pI_uFI2G5YG2c2lSy7LLlVmeY0ZFQRM3mM6vNAPQlRnxaKY-3V6r_x_Pa5gGmQNH3LH8kGggk87bBcjWkb"
    
    var fcm_message ={

        "message": {
            "token": fcm_target_token,
            "data": {
              "title": "test title",
              "message": "test message",
              "type": "NORMAL"
            }
          }
        
    };

    //메세지를 보내는 부분.
    admin.messaing().send(fcm_message)
        .then(function(response){
            console.log('보내기 성공 메시지:'+ response)
        })
        .catch(function(error){
            console.log('보내기 실패 메시지:'+ error)
        })
})
    


module.exports = router;
