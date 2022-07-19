import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const Contests = () => {
  const navigate = useNavigate();
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/contests")
      .then((Response) => {
        setContests(Response.data);
      })
      .catch((err) => {
        toast.err(err.message);
      });
  }, []);

  const handelClick = (contest_id) => {
    return navigate(`/contest-problems/${contest_id}`);
  };

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-2 border-green-600 w-fit">
          Contests
        </div>

        <div>
          {contests.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no Contests.
            </div>
          )}
        </div>

        
        <div>
          {contests && contests.map((el, index) => {
            return(
              <div
              className="bg-white p-6 mb-6 rounded shadow-xl"
                key={el.id}
              >
                <div className="relative">
                  <div className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-8 h-8 absolute top-[-28px] left-[-28px]">
                    {index+1}
                  </div>
                  <div className=" flex justify-between mb-1 mr-4">
                    <div className="flex items-center">
                      <div className="text-green-600 font-bold mb-2 pt-2">{el.name}</div>
                      <div className="mx-4 text-gray-600 font-bold">|</div>
                      <div className="text-gray-600 font-semibold">{el.description}</div>
                    </div>
                    <div>
                      <button 
                        className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold px-2 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none"
                        type="submit" 
                        onClick={() => handelClick(el.id)}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm mb-2 md:grid-cols-2">
                  <div className="flex items-center">
                    <div className="font-bold text-gray-500 mr-2">Num of Problems : </div>
                    <div className="font-semibold text-gray-700 mt-[2px]">{el?.problems.length}</div>
                  </div>
                  <div className="flex items-start gap-x-1">
                    <div className="font-bold text-gray-500 mt-[-2px]">Start Time : </div>
                    <div className="font-semibold text-gray-700">{new Date(el.start_at).toLocaleString("en-us")}</div>
                  </div>    
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">Level : </div>
                    <div className="font-semibold text-gray-700">{el.level}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">End Time : </div>
                    <div className="font-semibold text-gray-700">{new Date(el.end_at).toLocaleString("en-us")}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 mt-2 pb-4">
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">Status : </div>
                    <div className="font-semibold text-gray-700">{el.status}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}
 
export default Contests;