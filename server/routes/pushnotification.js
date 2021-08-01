const express = require('express');
const router = express.Router();
<<<<<<< HEAD
var admin = require("firebase-admin");
=======
const admin = require("firebase-admin");
const serviceAccount = require("../../client/public/key/firebaseServiceKey.json");
>>>>>>> afd59d157c88a6936d843c5fdc25617fe156bbd8

var serviceAccount = require("../../client/public/key/firebaseServiceKey.json");

var fcm_admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//=========================================
//             PushNotification
//=========================================

<<<<<<< HEAD
router.post("/sendMsg", (req, res) => {
    var fcm_target_token = "dwNyNQZNRNCuDznb_whlzR:APA91bGv7_wCmqOL-HhXMp2y0yLL4_vNoKLLf6niuqmn6USsSL_rOo-t43pI_uFI2G5YG2c2lSy7LLlVmeY0ZFQRM3mM6vNAPQlRnxaKY-3V6r_x_Pa5gGmQNH3LH8kGggk87bBcjWkb"
=======

router.post("/sendMsg", (req, res) => {
    var fcm_target_token = "dLhhPXACTwGVJrLpazeOkV:APA91bEja8OFwTcOsETng6rK6dm-aypYb6WZOafVtdjNEdjjKlVmZyVpG_7BQUsvxSSYvZ3FUm_eNeMoJuqhW11cdiTfi9nEPBv78nxqg3-8KaLzoIFg57CDZdqY_uXe3fEjKJtYlD-E"
>>>>>>> afd59d157c88a6936d843c5fdc25617fe156bbd8
    
   var fcm_message ={

            token: fcm_target_token,
            data: {
            title: "test title",
            message: "test message",
            type: "NORMAL"
           }
         }
   

    //메세지를 보내는 부분.
<<<<<<< HEAD
    
    fcm_admin.messaing().send(fcm_message)
        .then(function(response){
           return res.status(200).json({ success: true, err });
        })
        .catch(function(error){
          return res.json({ success: false, err });
=======
   admin.messaging().send(fcm_message)
        .then((response) => {
		console.log('successfully sent message:', response);
                return res.status(200).json({ success:true, response});
        })
        .catch((error) => { 
		console.log('Error sending message:', error)
                return res.json({ success: false, error});

>>>>>>> afd59d157c88a6936d843c5fdc25617fe156bbd8
        })
})
    


module.exports = router;
