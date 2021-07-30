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
    var fcm_target_token = "dLhhPXACTwGVJrLpazeOkV:APA91bEja8OFwTcOsETng6rK6dm-aypYb6WZOafVtdjNEdjjKlVmZyVpG_7BQUsvxSSYvZ3FUm_eNeMoJuqhW11cdiTfi9nEPBv78nxqg3-8KaLzoIFg57CDZdqY_uXe3fEjKJtYlD-E"
    
   var fcm_message ={

            token: fcm_target_token,
            data: {
            title: "test title",
            message: "test message",
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
