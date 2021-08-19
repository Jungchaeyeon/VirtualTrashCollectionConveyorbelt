import React,{ useEffect, Component } from 'react'
import { FaCode } from "react-icons/fa";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import {buildPj} from "../../../BuildProject/Build/BuildProject.json"
import UnityProgress from "../../../BuildProject/TemplateData/UnityProgress"
import { ReactDOM } from 'react';
import {render} from 'react-dom';


class PlayPage extends Component{
	     render(){
		     return(
		             <div>
		                 <meta charSet="utf-8" />
		                 <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
		                     <title>Unity WebGL Player | Conveyorbelt</title>
		                     <link rel="shortcut icon" href="TemplateData/favicon.ico" />
		                     <link rel="stylesheet" href="TemplateData/style.css" />
		                     <script src="TemplateData/UnityProgress.js"></script>
		                     <script src="Build/UnityLoader.js"></script>
		                     <script>
		                         var gameInstance = UnityLoader.instantiate("gameContainer", "Build/BuildProject.json", UnityProgress);
		                     </script>
		                     <div className="webgl-content">
		                     <div id="gameContainer" style={{width: '960px', height: '600px'}} />
		                     <div className="footer">
		                     <div className="webgl-logo" />
		                     <div className="fullscreen" onclick= "gameInstance.SetFullscreen(1)" />
		                     <div className="title">Conveyorbelt</div>
		                 </div>
		                 </div>
		           </div>
	     )
	     }
}
    
render(PlayPage, document.getElementById('root'));   
export default PlayPage
