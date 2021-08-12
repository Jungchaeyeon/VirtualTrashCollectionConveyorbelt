const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../../client/public/key/firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//=========================================
//             PushNotification
//=========================================


router.post("/sendMsg", (req, res) => {
    var fcm_target_token = "c0i3ZdUxQjeWvPHBuxuFnS:APA91bEtVdXm_fRAsNY6f_PXDJutdKpgMeB2pSvcPGgX0HoaMeTamEnBZbu9csfTIyA4hrgY56bsF-N25gv8huCrt7Tx_MXgvAHq0kIqqmcdWfoPQhocYG-M4w4XlD6FfStovht0tAHO"
    
   var fcm_message ={

            token: fcm_target_token,
            data: {
            title: "오류 발생",
            message: "컨베이어벨트 작동이 중단되었습니다.",
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
