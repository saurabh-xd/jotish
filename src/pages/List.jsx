import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((res) => {
        setData(res.TABLE_DATA.data);
      })
      .catch((err) => {
        console.error("Failed to fetch employees", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
      
        <div className="flex  sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
    
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Employees</h1>
            
         
          
          <button
            onClick={() => navigate("/chart")}
            className="bg-black text-white md:px-5 md:py-2.5 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 cursor-pointer active:scale-[0.98] transition-all shadow-sm"
          >
            View Analytics
          </button>
        </div>

      
        {loading ? (
          <div className="flex justify-center items-center h-48 text-gray-400 font-medium animate-pulse">
            Loading employees...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.map((emp, i) => (
              <div
                key={i}
                onClick={() => navigate(`/details/${i}`, { state: emp })}
                className="bg-white border border-gray-200 p-5 rounded-xl cursor-pointer hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
              >
                
                <div className="flex items-center flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{emp[0]}</h2>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{emp[1]}</p>
                </div>
                
               
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-sm text-gray-700 font-medium truncate max-w-[100px]">{emp[2]}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Salary</p>
                    <p className="text-sm font-semibold text-gray-900">{emp[5]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}