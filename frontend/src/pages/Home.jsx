import { jwtDecode } from 'jwt-decode'
import React, { useContext } from 'react'
import AuthContext from "../context/AuthContext"
import Navbar from './Navbar';
import Article from './Article';
import { Link } from 'react-router-dom'
import bgi from './img/image4.png';
import Navbar1 from './Navbar1';

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (user) {
    const decoded = jwtDecode(token)
    let user_id = decoded.user_id
  }

  return (
    <div  style={{       backgroundImage: `url(${bgi})`, backgroundColor:'white',width: '100vw', minHeight: '100vh', marginTop:'920px', marginLeft:'-590px',  alignItems: 'center' }}>

      {user ?
        <>
          <Navbar />
          <Article />
        </>
        :
        <>
          <Navbar1 />
          <Article />
        </>
      }
    </div>
  )
}

export default Home
