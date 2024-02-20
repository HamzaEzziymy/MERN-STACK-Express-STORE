import React from 'react'
import { FaFacebook, FaGithubAlt, FaLinkedin, FaRegCopyright, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Fotter() {
  return (
    <div className='fotter'>
      <div><p>CREAETED BY : </p>HAMZA EZ-ZIYMY<br/><p>SUPERVISION AND GUIDDANCE : </p>Mr QASSI MOHAMED</div>
      <div>
        CONECT US
        <div>
          <Link to="https://facebook.com"><FaFacebook/></Link>
          <Link to="https://whatsapp.com"><FaWhatsapp/></Link>
          <Link to="https://linkedin.com"><FaLinkedin/></Link>
          <Link to="https://github.com"><FaGithubAlt/></Link>
        </div>
      </div>
      <div> Created in 2023 <FaRegCopyright/></div>
    </div>
  )
}

export default Fotter;