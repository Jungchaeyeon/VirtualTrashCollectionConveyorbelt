import React from 'react'
import { Route, Switch } from "react-router-dom";
import Auth from "../../../hoc/auth";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage.js";
import RegisterPage from "../RegisterPage/RegisterPage.js";
import PeteDetailPage from "../DetailPage/PeteDetailPage";
import PetDetailPage from "../DetailPage/PetDetailPage";
import SpoonDetailPage from "../DetailPage/SpoonDetailPage"
import PlayPage from '../PlayPage/PlayPage';
import './Section.css'

function Section() {
    return (
        // <div style={{ position:'relative', height:'100%'}}>
        <div className='section'>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} /> {/* null - 누구나 접속 가능한 페이지 */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />{/* false - 로그인 한 사람만 접속 가능한 페이지 */}
          <Route exact path="/glassPlate" component={Auth(PeteDetailPage, true)} /> {/* true - 로그인 한 사람만 접속 가능한 페이지 */}
          <Route exact path="/pet" component={Auth(PetDetailPage, true)} /> {/* true - 로그인 한 사람만 접속 가능한 페이지 */}
	  <Route exact path="/spoon" component={Auth(SpoonDetailPage, true)} />
          <Route exact path="/letsPlay" component={Auth(PlayPage, null)}/>
        </Switch>
      </div>
    )
}

export default Section
