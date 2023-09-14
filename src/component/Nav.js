import React from "react";
import { BiMenu } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
const Nav = () => {
    return (
        <div className='nav'>
            <BiMenu size='70' fill="#8F8F8F" style={{flex:1}}/>
            <a href='https://looku' className='logo'><img src="img/logo.png" height='35'style={{flex:3}}/></a>
            <FaUserCircle size='50' fill="#8F8F8F" style={{flex:1}}/>
        </div>
    )
}

export default Nav