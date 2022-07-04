import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "./recoil";
import { decodeToken } from "react-jwt";
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import SignupUser from './pages/user/SignupUser';
import SigninUser from './pages/user/SigninUser';
import Topics from './pages/user/Topics';
import Problems from './pages/user/Problems';
import Problem from './pages/user/Problem';
import SignupCompany from './pages/company/SignupCompany';
import SigninCompany from './pages/company/SigninCompany';
import CompanyPage from './pages/company/CompanyPage';

function App() {
  const authToken = useRecoilValue(authState);
  const [token, setDecodeToken] = useState("");

  console.log(token);

  useEffect(() => {
    if (authToken) {
    const decode = decodeToken(authToken);
    setDecodeToken(decode);
    }
  }, [authToken]);

  const RedirectToLogin = () => {
    if (!authToken) return <Navigate to="/" />;
    return <Outlet />;
  };

  const RedirectToApp = () => {
    if (authToken){
      if (token.model === "company"){
        return <Navigate to="/company-page" />
      }else if (token.model === "developer"){
        return <Navigate to="/topics" />
      }
    }
    return <Outlet />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} /> 

          <Route element={<RedirectToApp/>}>
            <Route path='/signup' element={<SignupUser/>} /> 
            <Route path='/signin' element={<SigninUser/>} /> 
            <Route path='/signup-company' element={<SignupCompany/>} /> 
            <Route path='/signin-company' element={<SigninCompany/>} /> 
          </Route>
          
          <Route element={<RedirectToLogin/>}>
            {token.model === "developer" && (
              <>
                {/* Developer Routes */}
                <Route path='/topics' element={<Topics/>}/>
                <Route path='/problems/:topicId' element={<Problems/>}/>
                <Route path='/problem/:problemId' element={<Problem/>}/>
              </>
            )}
            
            {token.model === "company" && (
              <>
                {/* Company Routes */}
                <Route path='/company-page' element={<CompanyPage/>}/>
              </>
            )}
          </Route>

          <Route path="*" element={<NotFound/>} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
