/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return ( //로그인 하지 않은 사람들은 이곳이 렌더링
        <li>
          <a href="/login">Signin</a>      
          <a href="/register">Signup</a>
        </li>
     
    )
  } else {
    return ( //로그인 한 사람들은 이곳이 렌더링
        <li>
          {/* <a href="/video/upload">Video</a> */}
          <a onClick={logoutHandler}>Logout</a>
          </li>
    )
  }
}

export default withRouter(RightMenu);

