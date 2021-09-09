import React,{ useEffect,useState } from 'react'
import './PetDetailPage.css'
import { Collapse, DatePicker } from 'antd'
import Axios from 'axios';


const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
function PetDetailPage() {
    
    // 실시간 데이터 
    const [data, setData] = useState({
        eventName : '',
        date : '',
        item: '',
        inputTrash: 0,
        recyclingTrash: 0,
        recyclingRate: 0,
        uptime: 0,
      })
    // 기록 데이터
    const [recordData, setrecordData] = useState({
        date : '',
        item: '',
        inputTrash: 0,
        recyclingTrash: 0,
        recyclingRate: 0,
        uptime: 0,
      })
    //오늘 데이터
    const [todayData, settodayData] = useState({
        eventName : '',
        date : '',
        item: '',
        inputTrash: 0,
        recyclingTrash: 0,
        recyclingRate: 0,
        uptime: 0,
    })
    
    var ws = new WebSocket('ws://3.37.86.169:8080')

    useEffect(() => {
       
        ws.onopen = (event) => {
		  	let sendData = {eventName: 'open'}
		    ws.send(JSON.stringify(sendData))
		    }
        // 현재 날짜
        let nowDate = getNowDate();

        //20210611 render
        setData(data => ({
					...data,
					date : `${nowDate}`   
        }));
     
        let variable = { date : nowDate,
			 item : "Pet"}
        getData(variable);

        }, [])
		ws.onmessage = e => {
			
			let recData = JSON.parse(e.data);			
			switch (recData.item){
				case 'Pet':
          //실시간 데이터 state
				  ws.send(JSON.stringify(recData));
				  setData(data => ({ //date 추가하지 않을 것
					...data, 
					item: recData.item,
					inputTrash :  recData.inputTrash,
					recyclingTrash :  recData.recyclingTrash,
					recyclingRate : parseInt(recData.recyclingRate),
					uptime : recData.uptime,
				}));
       
				  break;
			  }
		}
		 useEffect(() => {
      
      
      let variable = {
        item: data.item,
        date: data.date,
        inputTrash :todayData.inputTrash + data.inputTrash,
        recyclingTrash : todayData.recyclingTrash + data.recyclingTrash,
        recyclingRate : data.recyclingRate,
        uptime : todayData.uptime + data.uptime
      }
       console.log(variable)
       setTimeout(() => {
        pushData(variable);   
       }, 500); 
     
       //코드 바꿔보기
      // setData(data=>({
      //   ...data,
      //   inputTrash: +todayData.inputTrash,
      //   recyclingTrash : +todayData.recyclingTrash ,
      //   recyclingRate: parseInt((todayData.inputTrash + data.inputTrash) / (todayData.recyclingTrash + data.recyclingTrash))*100,
      //   uptime : +todayData.uptime 

       
      }, [data.uptime]);
    
		ws.onclose = e =>{
			clearInterval();
		}

    function getNowDate(){
      let nowDate = new Date().toLocaleDateString().split('.')
      console.log(nowDate)
	
        	var year = nowDate[0].trim()
                let month = nowDate[1]+''
                let  day = nowDate[2]+''

		month = parseInt(month.trim())
		day = parseInt(day.trim())

                if(month<=9 && month>=1) month = '0'+ month
                if(day<=9 && day>=1) day = '0'+ day

    		return year+month+day 
	
    }

    function pushData(variable){
    
      Axios.post('/api/recycledata/setData', variable)
        .then(response =>{
            if(response.data.success){
                console.log("성공적으로 저장했습니다.")  
            }
            else{
                console.log("데이터 저장에 실패했습니다.")
            }
        })
    }

    function getData(variable){
      Axios.post('/api/recycledata/getData', variable)
      .then(response =>{
        
          if(response.data.success && response.data.data !== null){
            let getData = response.data.data
            let date = getNowDate();
          
          console.log(getData.date+"datedata")
	  	  
	  if(getData.date == date) {
              settodayData(data =>({
                date: getData.date,
                item: getData.item,
                inputTrash: getData.inputTrash,
                recyclingTrash: getData.recyclingTrash,
                recyclingRate: getData.recyclingRate,
                uptime: getData.uptime
              }))
              console.log(todayData)
            }

            setrecordData(data =>({
                ...data,
                date: getData.date,
                item: getData.item,
                inputTrash: getData.inputTrash,
                recyclingTrash: getData.recyclingTrash,
                recyclingRate: getData.recyclingRate,
                uptime: getData.uptime
              }))
             
          }else{
		  let date = getNowDate();

		               setrecordData(data =>({
				     ...data,
				     date: variable.date,
				     item: "Pet",
				     inputTrash: 0,
				     recyclingTrash: 0,
				     recyclingRate: 0,
				     uptime :0
				                                          }))
              console.log('데이터를 가져오는 데 실패했습니다.')
          }
      })  
    }
    function onChange(date, _dateString) {
      let dateString = _dateString.replace(/-/gi,'')
      let pushData ={ date : dateString,
                      item : "Pet"}
      getData(pushData);
     
    }

    const renderData = (data)=>{
      return (<p>
        <h4 className="content">{data.date.substr(0,4)}년 {data.date.substr(4,2)}월 {data.date.substr(6,2)}일</h4>
        <h4 className="content">분리배출 품목 : Pet </h4>
        <h4 className="content">총 쓰레기 배출량(갯수) : {data.inputTrash}</h4>
        <h4 className="content">재활용 가능 쓰레기량(갯수) : {data.recyclingTrash}</h4>
        <h4 className="content">재활용률( % ) :  {data.recyclingRate}</h4>
        <h4 className="content">컨베이어벨트 가동시간( 초 ) : {data.uptime} </h4>
      </p>
      );}
    return (
        <div className="div">
        <section className="section" >
            <video className="video" muted autoPlay loop>
                <source src="/Videos/conveyPet.mp4" type="video/mp4"/>
            </video>            
        <Collapse className="panel" defaultActiveKey={['1']} onChange={callback}>
            <Panel header="실시간 Pet 분리수거 현황" key="1">
               {renderData(data)}
            </Panel>
            <Panel header="일 별 Pet 분리수거 현황" key="2">            
              <DatePicker onChange={onChange} style={{ marginBottom: '20px'}}/>
              {renderData(recordData)}
            </Panel>
        </Collapse>
       
        </section>
    </div>
    )
}

export default PetDetailPage
