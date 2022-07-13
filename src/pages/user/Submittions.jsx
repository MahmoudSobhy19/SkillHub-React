import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const Submittions = () => {
  const [submittions, setSubmittions] = useState([]);

  return ( 
    <div className="bg-gray-100 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-2 border-green-600 w-fit">
          Submittions
        </div>

        <div>
          {submittions.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <Loader />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
 
export default Submittions;