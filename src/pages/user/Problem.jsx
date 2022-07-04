import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from '../../components/Navbar';  

const Problem = () => {
  const param = useParams();
  const [problem, setProblem] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/problems/${param.problemId}`)
      .then((Response)=>{
        setProblem(Response.data);
        console.log(Response.data)
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return ( 
    <div className='bg-gray-100 min-h-screen pb-10'>
      <Navbar/>
      <div className='container mx-auto px-10'>
        <div className='grid grid-cols-1 divide-y'>
          <div>
            problem
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Problem;