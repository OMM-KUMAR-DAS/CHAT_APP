import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


const Home = () => {

  return (
    <div>
           <Link to="/Login"><Button variant="contained">Login</Button></Link>

           <Link to="/Sign"><Button variant="contained" >Signup</Button></Link>
    </div>
  )
}

export default Home