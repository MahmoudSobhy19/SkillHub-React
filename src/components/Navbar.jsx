import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authState } from "../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { decodeToken } from "react-jwt";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const setToken = useSetRecoilState(authState);

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
    <nav className="bg-gray-600 h-64 md:h-fit">
      <div className="container mx-auto px-10 h-12 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center flex-col md:flex-row">
          <div className="flex items-center mr-6">
            <a href="/topics" className="text-white text-2xl font-bold">
              SkillHub
            </a>
            <span className="w-4 h-6 ml-1 bg-green-600 block"></span>
          </div>

          <div>
            <ul className="flex items-center flex-col md:flex-row gap-3 text-sm font-bold text-white">
              <li>
                <NavLink 
                  to='/topics'
                  className={({ isActive }) => isActive ? "border-green-600 border-b-4 pt-3.5 pb-2.5" : undefined }
                >
                  Practice
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? "border-green-600 border-b-4 pt-3.5 pb-2.5" : undefined }
                  to={`/submittions/${token.id}`}
                >
                  Submissions
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? "border-green-600 border-b-4 pt-3.5 pb-2.5" : undefined }
                  to="/contests"
                >
                  Contests
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/jobs"
                  className={({ isActive }) => isActive ? "border-green-600 border-b-4 pt-3.5 pb-2.5" : undefined }
                >
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/leader-board"
                  className={({ isActive }) => isActive ? "border-green-600 border-b-4 pt-3.5 pb-2.5" : undefined }
                >
                  LeaderBoard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[-10px]">
          <a 
            href="/profile"
            className="flex flex-col md:flex-row items-center gap-2 text-gray-300 mt-2 hover:text-white"
          >
            <div className="flex items-center">
              <FaUser className="text-xl mr-2" />
              <div className="text-xs font-semibold">{token.username}</div>
              <div className="mx-2"> | </div>
            </div>
            <button
              className="text-white bg-green-600 px-3 py-[3px] font-bold rounded hover:bg-green-400 focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
