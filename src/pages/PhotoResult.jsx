import { useLocation, useNavigate } from "react-router-dom";

export default function PhotoResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full">
        
        
        <button
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Result Card */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm text-center">
         
          <p className="text-sm text-gray-900 mt-1 mb-8">Photo captured successfully.</p>

          {image ? (
            <div className="relative w-full aspect-[4/3] mb-8 group">
              <img
                src={image}
                alt="Captured employee"
                className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm"
              />
              <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none"></div>
            </div>
          ) : (
            <div className="w-full aspect-[4/3] mb-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
              <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">No photo found</p>
            </div>
          )}

          <button
            onClick={() => navigate("/list")}
            className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm"
          >
            Return to List
          </button>
        </div>

      </div>
    </div>
  );
}