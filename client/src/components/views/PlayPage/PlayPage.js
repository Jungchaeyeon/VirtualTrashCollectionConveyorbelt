import React,{ useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import "./LandingPage.css"
import { Link } from 'react-router-dom';
import {buildPj} from "../../../BuildProject/Build/BuildProject.json"
import UnityProgress from "../../../BuildProject/TemplateData/UnityProgress"

function PlayPage(props) {

    return (
        <div className="container">

            <title>Unity WebGL Player | Conveyorbelt</title>
            <Link href="shortcut icon" href="TemplateData/favicon.ico"></Link>
            <link rel="stylesheet" href="TemplateData/style.css"></link>
            <script src="TemplateData/UnityProgress.js"></script>
            <script src="Build/UnityLoader.js"></script>
            <script>
                var gameInstance = UnityLoader.instantiate("gameContainer", buildPj, onProgress: UnityProgress);
            </script>

        <body>
            <div class="webgl-content">
            <div id="gameContainer" style="width: 960px; height: 600px"></div>
            <div class="footer">
                <div class="webgl-logo"></div>
                <div class="title">Conveyorbelt</div>
            </div>
            </div>
        </body>
        </div>
    )
}

export default PlayPage