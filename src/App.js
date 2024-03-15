
import './App.css';

import {Routes,Route } from 'react-router-dom';

import Home from './components/Home'

import Chat from './components/Chat'

import Login from './components/Login'

import Sign from './components/Sign'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';



function App() { 

  
   
  
  return (

    <div className="App">
     
        
                  
                  <Routes>

                      <Route path='/' element={<Home/>}></Route>

                      <Route path='/Login' element={<Login/>}></Route>

                      <Route path='/Sign' element={<Sign />}></Route>

                      <Route path='/chat' element={<Chat/>}></Route>
     
                      <Route path='*' element={<p><strong>This page does not exists</strong></p>}></Route>



                        <Route path='/chat' element={

                             <PrivateRoute>
                                   <Chat/>
                             </PrivateRoute>}
                        ></Route>
                             
                     

                  </Routes>
                  
                  <ToastContainer/>

       
    </div>
  );
}

export default App;
