import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { Modal } from "../../components/models/Base";
import useToggleModal from "../../hooks/useToggleModel";

const Submittions = () => {
  const param = useParams();
  const [submittions, setSubmittions] = useState([]);
  const [isOpen, toggleModal] = useToggleModal();

  useEffect(() => {
    axios
      .get("/api/v1/submissions/", {
        params: {
          developer_id: param.developerId,
        },
      })
      .then((Response) => {
        setSubmittions(Response.data);
        console.log(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen pb-10 ">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-2 border-green-600 w-fit">
          Submittions
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm font-semibold text-left text-gray-600 divide-y-2">
            <thead className="text-xs uppercase text-green-600 bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  When
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Problem
                </th>
                <th scope="col" className="py-3 px-6">
                  Languge
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Time
                </th>
                <th scope="col" className="py-3 px-6">
                  Memory
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {submittions && submittions.map(el => {
                return(
                  <tr 
                    key={el.id}
                    className="border-b"
                  >
                    <td className="py-4 px-6">
                      <a
                        className="font-medium text-blue-600 underline hover:cursor-pointer"
                        onClick={toggleModal}
                      >
                        {el.id}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-xs">{new Date(el.created_at).toLocaleString("en-us")}</td>
                    <td className="py-4 px-6 font-semibold">{el.developer.username}</td>
                    <td className="py-4 px-6">
                      <a
                        href={`/problem/${el.problem.id}`}
                        className="font-medium text-blue-600 underline"
                      >
                        {el.problem.title}
                      </a>
                    </td>
                    <td className="py-4 px-6">{el.programming_languge}</td>
                    <td className="py-4 px-6">{el.status}</td>
                    <td className="py-4 px-6">{el.time_limit + " "} ms</td>
                    <td className="py-4 px-6">{el.memory_limit + " "} KB</td>
                    <td>
                      <Modal title="Your Submittion" isOpen={isOpen} handleClose={toggleModal}>
                        <div className="bg-gray-200 rounded-xl p-6">
                          {el.source_code}
                        </div>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
};

export default Submittions;
