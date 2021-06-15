const express = require('express');
const router = express.Router();
const { RecycleData } = require("../models/RecycleData");
const { auth } = require("../middleware/auth");

//=========================================
//             RecycleData
//=========================================

router.post("/getData", (req, res) => {
 

    RecycleData.findByDate(req.body.date,(err, data)=>{
            
            if(data !== null && req.body.date !== ""){ 
                if(err) return res.json({success: false, err})
                res.status(200).json({success: true, data })         
            }
            if(data === null) res.status(200).json({success: true, data})
        })
    })

router.post('/setData', (req, res) => {

    let variable = {
        item: '',
        inputTrash: 0,
        recyclingTrash: 0,
        recyclingRate: 100,
        date: req.body.date,
        uptime: 0
    }
    const recycleData = new RecycleData(variable);

    RecycleData.findByDate(req.body.date,(err, data)=>{

        if(data === null && req.body.date !== ""){
            //해당 날짜에 대한 데이터가 아직 저장되어있지 않다면
            
            recycleData.save((err, result) => {
                //console.log(result)
                if (err) return res.json({ success: false, err })
                res.status(200).json({success: true, result  })
            })
           
        }
        if(data !== null && req.body.date !== ""){
            
            //해당날짜에 대한 데이터가 저장되어 있다면
            RecycleData.findOneAndUpdate(
                { date : req.body.date },
                { 
                  $set: {
                      inputTrash:   req.body.inputTrash,
                      recyclingTrash:  req.body.recyclingTrash,
                      uptime:  req.body.uptime,
                      recyclingRate:  req.body.recyclingRate
                        }
                }).exec((err, result)=>{
                    if (err) return res.json({ success: false, err });
                    return res.status(200).json({
                        success: true, result      });

                })
         }
    })
    
    })

module.exports = router;
