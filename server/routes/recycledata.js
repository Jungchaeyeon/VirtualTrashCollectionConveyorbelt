const express = require('express');
const router = express.Router();
const { RecycleData } = require("../models/RecycleData");
const { auth } = require("../middleware/auth");

//=========================================
//             RecycleData
//=========================================

router.post("/getData", (req, res) => {
 
    
    RecycleData.findByDate(req.body,(err, data)=>{
            
            if(data !== null){ 
                if(err) return res.json({success: false, data})
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

    RecycleData.findByDate(req.body,(err, data)=>{
       
            //해당 날짜에 대한 데이터가 아직 저장되어있지 않다면
	   if(req.body.item =="Pet" && data === null){
		   console.log("pet데이터 없음")
		   //if(data === null && req.body.date !==""){
		   const recyclePet = new RecycleData(variable)
		   recyclePet.item = "Pet"
		   recyclePet.save((err, result) => {
		   //console.log(result) 
	           if (err) return res.json({ success: false, err })
		   res.status(200).json({success: true, result  })
				                   })
	   }
	   else if(req.body.item == "GlassPlate" && data === null){	
		   console.log("glassplate데이터 없음")
		   //if(data === null && req.body.date !==""){
		   const recyclePlate = new RecycleData(variable)
                   recyclePlate.item = "GlassPlate"
                   recyclePlate.save((err, result) => {
                   //console.log(result)
                   if (err) return res.json({ success: false, err })
                   res.status(200).json({success: true, result  })
            })
	   }else{}
          
        if(data !== null && req.body.date !== ""){
            
            //해당날짜에 대한 데이터가 저장되어 있다면
            RecycleData.findOneAndUpdate(
                { date : req.body.date,
		  item : req.body.item},
                { 
                  $set: {
		      item: req.body.item,	  
                      inputTrash:   req.body.inputTrash,
                      recyclingTrash:  req.body.recyclingTrash,
                      uptime:  req.body.uptime,
                      recyclingRate:  req.body.recyclingRate
                        }
                }).exec((err, result)=>{
                    if (err){
			return res.json({ success: false, err })
		    }
                    return res.status(200).json({
                        success: true, result      });

                })
         }
    })
    
    })

module.exports = router;
