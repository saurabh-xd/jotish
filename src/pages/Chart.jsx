import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const COLORS = ['#111827', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB'];

export default function ChartPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((res) => {
  const rows = res.TABLE_DATA.data;

 
  const raw = rows.slice(0, 10);
  const formatted = raw.map((emp) => ({
    name: emp[0].split(" ")[0],
    salary: parseInt(emp[5].replace(/[$,]/g, ""), 10),
  }));
  setData(formatted);

  
  const cityCounts = {};
  rows.forEach((emp) => {
    const c = emp[2];
    cityCounts[c] = (cityCounts[c] || 0) + 1;
  });

  const cityFormatted = Object.keys(cityCounts).map((c) => ({
    city: c,
    count: cityCounts[c],
  }));

  setCityData(cityFormatted);
})
      .catch((err) => toast.error("Failed to fetch chart data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        
        <button
          onClick={() => navigate("/list")}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors cursor-pointer"
        >
         ←
          Back to Employees
        </button>

        {/* Chart Card */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Salary Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Top 10 highest earning employees</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[400px] text-gray-400 font-medium animate-pulse">
              Loading chart data...
            </div>
          ) : (
            <>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke="#E5E7EB" 
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      fontWeight: 500,
                      color: '#111827'
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']}
                  />
                  <Bar 
                    dataKey="salary" 
                    fill="#000000" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

         <div className="mt-12">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Employees by City</h2>

              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        fontWeight: 500,
                        color: '#111827'
                      }}
                      formatter={(value) => [value, 'Employees']}
                    />
                    <Pie
                      data={cityData}
                      dataKey="count"
                      nameKey="city"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2} 
                      stroke="none" 
                    >
                      {cityData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend 
                      iconType="circle" 
                      wrapperStyle={{ fontSize: '14px', color: '#4B5563' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
</>
          )}
        </div>
        
      </div>
    </div>
  );
}