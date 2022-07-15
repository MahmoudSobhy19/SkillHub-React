import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";

const Jobs = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    if(token){
      axios
      .get("/api/v1/companies/contests", {
        params: {
          company_id: token.id,
        },
      })
      .then((Response) => {
        setJobs(Response.data);
        console.log(Response.data);
      })
      .catch((err) => {
        toast.err(err.message);
      });
    }
  }, [token]);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar/>
      <div className="bg-white py-4 mb-8">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="text-gray-600 text-2xl font-bold">
            Jobs
          </div>
          {/* <CreateProblem /> */}
        </div>
      </div>
      <div className="container mx-auto px-10">
        <div>
          {jobs.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no Jobs, Add Job.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
 
export default Jobs;