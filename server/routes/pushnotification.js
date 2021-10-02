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

    var fcm_target_token = "delpS_ScTp2Yda9jpFqDyn:APA91bHMrHLXGiaaRIHIm2QiKbgIwvCYcAprUbp_FS9vskpdVmfdoar5QtrG9ejwQsN-MWOrzu4GHGDBwNToVjRovDRH--ztQVZyc9ZycOIpnZ07kDpms7DPeP2fPYRKx8ooy2Peocy2"
    
   var date = new Date()
	
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
