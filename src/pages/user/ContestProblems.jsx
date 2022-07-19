import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const ContestProblems = () => {
  const param = useParams();
  const [contest, setContest] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/contests")
      .then((Response) => {
        setContest(Response?.data.filter(el => el.id == param.contestId));
        console.log(Response.data);
        console.log(contest);
      })
      .catch((err) => {
        toast.error(err.message)
      });
  }, []);

  return (  
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-4 border-green-600 w-fit">
          Problems
        </div>

        <div>
          {contest[0]?.problems.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no problems.
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 divide-y">
          {contest[0]?.problems?.map((el) => {
            return (
              <a key={el.id} href={`/problem/${el.id}`}>
                <div className="bg-white px-10 py-4 cursor-pointer flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <h1 className="text-lg text-gray-700 font-medium hover:text-green-600">
                      {el.title}
                    </h1>
                    <div>
                      <p className="text-green-600 text-sm">{el.difficullty}</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-green-600 text-sm bg-white border-solid border-[1px] border-green-600 font-semibold px-3 py-1 rounded-sm hover:text-green-400 hover:border-green-400 focus:outline-none ">
                      Solve Challenge
                    </button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 
export default ContestProblems;