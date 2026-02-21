import { useEffect, useMemo, useState } from "react";
import { fetchEmployees } from "../services/api";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((res) => {
        setData(res.TABLE_DATA.data);
      })
      .finally(() => setLoading(false));
  }, []);

 
  const cities = useMemo(() => {
    const all = data.map((e) => e[2]);
    return ["all", ...new Set(all)];
  }, [data]);


  const filtered = useMemo(() => {
    return data.filter((emp) => {
      const matchSearch = emp[0]
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCity =
        city === "all" || emp[2] === city;

      return matchSearch && matchCity;
    });
  }, [data, search, city]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

       
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              Employees
            </h1>

           
          </div>

<div className="flex justify-between">

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full sm:w-64"
            />

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full sm:w-48"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Cities" : c}
                </option>
              ))}
            </select>
          </div>

 <button
              onClick={() => navigate("/chart")}
              className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer text-sm h-10"
            >
              View Analytics
            </button>
          </div>
        </div>

       
        {loading ? (
          <Skeleton/>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((emp, i) => (
              <div
                key={i}
                onClick={() =>
                  navigate(`/details/${i}`, { state: emp })
                }
                className="bg-white border p-5 rounded-xl cursor-pointer hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold">
                  {emp[0]}
                </h2>
                <p className="text-sm text-gray-500">
                  {emp[1]}
                </p>

                <div className="mt-6 pt-4 border-t flex justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      Location
                    </p>
                    <p className="text-sm">{emp[2]}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Salary
                    </p>
                    <p className="text-sm font-semibold">
                      {emp[5]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

       
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No employees found
          </p>
        )}
      </div>
    </div>
  );
}