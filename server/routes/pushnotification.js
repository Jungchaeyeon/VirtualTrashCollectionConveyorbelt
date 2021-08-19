const express = require('express');
const router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../../client/public/key/firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//=========================================
//             PushNotification
//=========================================


router.post("/sendMsg", (req, res) => {

    var fcm_target_token = "cS1ekTMeTouPIeFBK56VU4:APA91bGm0Vz4HVt9rKxnI9rjPQ-3JWW0xTti_FuE87wGXwkF3nBsL7rVE_V_F2bxGY7QTEbOQMRzD2UDtLbiRsATjNPmpGr8Thug5ZYZQ50YUpKbx__YczPh5xsjOnZBvh9Jc4-5G39N"
    
   var fcm_message ={

            token: fcm_target_token,
            data: {
            title: "오류 발생",
            message: "컨베이어벨트 작동이 중단되었습니다.\n"+date.getFullYear+"/"+(date.getMonth()+1)+"/"+date.getDate+"",
            type: "NORMAL"
           }
         }
   

    //메세지를 보내는 부분.

   admin.messaging().send(fcm_message)
        .then((response) => {
		console.log('successfully sent message:', response);
                return res.status(200).json({ success:true, response});
        })
        .catch((error) => { 
		console.log('Error sending message:', error)
                return res.json({ success: false, error});

        })
})
    


module.exports = router;
