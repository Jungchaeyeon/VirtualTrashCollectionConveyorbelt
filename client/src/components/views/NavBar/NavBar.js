import React, { useEffect,useState } from 'react';
import './Sections/Navbar.css';
import RightMenu from './Sections/RightMenu';
import { Typography } from "antd";
import 'antd/dist/antd.css';

const { Title } = Typography;

function NavBar() {
 
  return (
    <div>
        <header style={{display:'flex'}}>
          <div className="logo"  style={{display:'inline-block'}}>
            <Title level={1} style={{ marginTop: '0.5em'}}>YANADO</Title>
          </div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Record</a></li>
            <li><a href="/about">About</a></li>
            <RightMenu/>
            <li className="close">X</li>
          </ul>
          <div className="menu">Menu</div>
        </header>
    </div>
  )
}

export default NavBar