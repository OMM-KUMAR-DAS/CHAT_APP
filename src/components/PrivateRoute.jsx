import React from 'react'
import { Navigate } from 'react-router-dom'
// import {  useSelector } from 'react-redux/es/hooks/useSelector';


const PrivateRoute=({children}) =>{

    
    
// const hh= useSelector((state)=>state.protected)
// console.log(hh.logged)

 const hh=false

 if(!hh)
 {
     return <Navigate to='/Login'/>
 }

return children
 
}

export default PrivateRoute;