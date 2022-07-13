import React, { useState, useEffect } from 'react';
import { authState } from "../../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { decodeToken } from "react-jwt";

const CompanyPage = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const setToken = useSetRecoilState(authState);
  console.log(token)
  useEffect(() => {
    if (authToken) {
    const decode = decodeToken(authToken);
    setDecodeToken(decode);
    }
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return ( 
    <div className='flex justify-between container px-10 mt-6'>
      <div>Hello Company !</div>
      <div>{token.email}</div>
      <button 
        className='text-white bg-green-600 px-3 py-[3px] font-bold rounded hover:bg-green-400 focus:outline-none'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
 
export default CompanyPage;