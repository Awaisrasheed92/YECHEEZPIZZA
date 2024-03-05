import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

 import '../../styles/dashheader.css';
function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon' style={{color:'white'}}/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon' style={{color:'white'}}/>
            <BsFillEnvelopeFill className='icon' style={{color:'white'}}/>
            <BsPersonCircle className='icon' style={{color:'white'}}/>
        </div>
    </header>
  )
}

export default Header