import React, { useEffect,useState } from 'react';
import './Sections/Navbar.css';
import RightMenu from './Sections/RightMenu';
import { Typography } from "antd";
import 'antd/dist/antd.css';

const { Title } = Typography;

function NavBar() {

   const [istoggle, setIstoggleData] = useState(false)
   const menuToggle =() =>{
        setIstoggleData(!istoggle)
		    }
   const closeToggle =() =>{
        setIstoggleData(false)                 
   }
   return (
    <div>
        <header style={{display:'flex'}}>
          <div className="logo"  style={{display:'inline-block'}}>
            <Title level={1} style={{ marginTop: '0.5em'}}>YANADOO</Title>
          </div>
          <ul className={istoggle ? "toggle" : ""}>
            <li><a href="/">Home</a></li>
            <li><a href="/">Lets Play</a></li>
            <li><a href="/about">About</a></li>
            <RightMenu/>
            <li className="close" onClick={closeToggle}>X</li>
          </ul>
          <div className="menu" onClick={menuToggle}>Menu</div>
        </header>
    </div>
  )
}

export default NavBar
