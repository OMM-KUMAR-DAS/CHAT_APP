import React from 'react'
import { Link } from 'react-router-dom'



const Home = () => {
  return (
    <div>
           <Link to="/Login"><button>Login</button></Link>

           <Link to="/Sign"><button>Signup</button></Link>
    </div>
  )
}

export default Home