import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from '../auth';

const Index = () => {
    
    const [data] = useState([<Login />, <Signup />,<div className='start'>Login to start chatting!</div>]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showCurrent, setShowCurrent] = useState(false);

    const setCurrent = index => {
        setCurrentIdx(index);
        if (!showCurrent) {
        setShowCurrent(true);
        return;
        };
    }

    const { user } = useAuth();

    useEffect(() => {
        if (user == false || user == null) {
            setCurrent(2)
        }
    }, [user]);
        



    return (
        <div className='root'>
              <ToastContainer />
              <div className='navbar'>
                  <a onClick={() => setCurrent(0)}>Login</a> 
                  <a onClick={() => setCurrent(1)}>Sign up</a>
              </div>
              <div>     
              {showCurrent ? <div>{data[currentIdx]}</div> : null}
              </div>
              <footer>Chadi Abdelghani-Idrissi</footer>
        </div>
     );
}
 
export default Index;