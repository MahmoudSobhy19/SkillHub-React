import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from '../../components/Navbar';  

import { useRef } from "react";
import Editor from "@monaco-editor/react"

const Problem = () => {
  const param = useParams();
  const [problem, setProblem] = useState([]);
  const editorRef = useRef(null);

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

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; 
  };
  
  const showValue = () => {
    console.log(editorRef.current.getValue());
  };

  return ( 
    <div className='bg-gray-100 min-h-screen pb-10'>
      <Navbar/>
      <div className='container mx-auto px-10'>
        <div className='grid grid-cols-1 divide-y'>
          <div>
            <button onClick={showValue}>Show value</button>
            <Editor
              height="400px"
              defaultLanguage="cpp"
              // [ javascript - ruby - python - c - cpp - java ]
              defaultValue="// Strat coding . . ."
              onMount={handleEditorDidMount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Problem;