import React,{ useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import "./LandingPage.css"
import $ from 'jquery';
import Axios from 'axios'

function LandingPage(props) {


    //컨베이어벨트 종류
    const conveyorbeltType = [
    {
        class: 'GlassPlate',
        subHeading : 'Conveyor belt sorting only recyclable Plate',
        img: 'img-bg1.png'
    },{
        class: 'Glass bottle',
        subHeading : 'Conveyor belt sorting only recyclable glass bottles',
        img: 'img-bg2.png'
    },{
        class: 'Can',
        subHeading : 'Conveyor belt sorting only cans',
        img: 'img-bg3.png'
    }]

    //푸시 알림 전송
     const  sendPushMessage =()=>{
         
        Axios.post('/api/push/sendMsg')
        .then(response =>{
           // if(response.data.success){
             //   console.log("성공적으로 알림을 전송했습니다.")  
            //}
           // else{
             //   console.log("알림 전송에 실패했습니다.")
            //}
        })
      }

    //페이지 이동
    const toDetailPage =(index)=>{
        console.log(index) // 0 - pete, 1 - glass, 2 - Can
        if(index === 0) props.history.push("./glassPlate")
        // if(index === 1) props.history.push("./glassDetail")
        // if(index === 2) props.history.push("./canDetail")
    }

    //카드 매핑 & 렌더링
    const renderingCards = conveyorbeltType.map((type, index)=>{

        return <div key= {index} className="card" onClick={()=>toDetailPage(index)}>
        <span></span>
        <div className="imgBox"><img src={type.img}/></div>
        <div className="content">
            <div>
                <h2>{type.class}</h2>
                <p>
                    {type.subHeading}
                </p>
            </div>
        </div>
    </div>
    })

    const useScript =`     
    $(function(){
      $('.card').on('mouseenter', function(e){
         let x = e.pageX - $(this).offset().left;
         let y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
      }),
      $('.card').on('mouseout', function(e){
        let x = e.pageX - $(this).offset().left;
        let y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
      })
      
      })
  `

    return (
    
        <div className="container">
            <React.Fragment>
                {renderingCards}
            </React.Fragment>

            <button onClick={sendPushMessage}>푸시알림보내기</button>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossOrigin="anonymous"></script>
            <script dangerouslySetInnerHTML={{__html:useScript}}>
            </script>
       </div>
   
    )
}

export default LandingPage
