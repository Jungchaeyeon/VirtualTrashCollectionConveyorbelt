const mongoose = require('mongoose');


const recycleDataSchema = mongoose.Schema({
   
    eventName: {             // 
        type:String
    },
    date:{              //날짜 ex) 20210611
        type: String
    },
    item: {             // 컨베이어 종류
        type:String,

    },
    inputTrash : {      //총 쓰레기 배출량
        type:Number,
        default: 0 
    },
    recyclingTrash : {      //재활용 가능 쓰레기 갯수
        type:Number,
        default: 0 
    },
    recyclingRate : {
        type: Number,        //재활용률
        default: 0
    },
    uptime : {        //시간 단위
        type: Number,
        default: 0 
    }
})

recycleDataSchema.statics.findByDate = function (_data, cb) {
    var recycleData = this;
    recycleData.findOne({date : _data.date,
    			 item : _data.item},
	    function(err, recycledata){
	        if(err) return cb(err);
	        return cb(null, recycledata);
   		 })

}

const RecycleData = mongoose.model('RecycleData', recycleDataSchema);

module.exports = { RecycleData }
