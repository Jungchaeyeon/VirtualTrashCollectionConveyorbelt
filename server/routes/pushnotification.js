const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../../client/public/key/firebaseServiceKey.json");
const fcm_admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//=========================================
//             PushNotification
//=========================================


router.post("/sendMsg", (req, res) => {
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
    fcm_admin.messaing().send(fcm_message)
        .then((response) => {
		console.log('successfully sent message:', response);
            return res.status(200).json({ success:true, err});
        })
        .catch((error) => { 
		console.log('Error sending message:', error)
            return res.json({ success: false, err});

        })
})
    


module.exports = router;
