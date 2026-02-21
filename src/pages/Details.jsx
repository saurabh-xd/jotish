import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef, useState } from "react";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state;

  const webcamRef = useRef(null);
  const [showCam, setShowCam] = useState(false);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    navigate("/photo", { state: { image: imageSrc } });
  };

 
  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No employee data found.</p>
          <button 
            onClick={() => navigate("/list")}
            className="text-sm font-medium text-black underline hover:text-gray-600"
          >
            Return to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
     
        <button
          onClick={() => navigate("/list")}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Employees
        </button>

        {/* Profile Card */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm mb-8">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{employee[0]}</h1>
            <p className="text-lg text-gray-500 mt-1">{employee[1]}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Location</p>
              <p className="text-gray-900 font-medium">{employee[2]}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Employee ID</p>
              <p className="text-gray-900 font-medium">{employee[3]}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Start Date</p>
              <p className="text-gray-900 font-medium">{employee[4]}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Salary</p>
              <p className="text-gray-900 font-medium">{employee[5]}</p>
            </div>
          </div>
        </div>

        {/* Camera Section */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col items-center">
          {!showCam ? (
            <div className="text-center w-full">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Identity Verification</h2>
             
              <button
                onClick={() => setShowCam(true)}
                className="w-full sm:w-auto bg-black text-white cursor-pointer px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm"
              >
                Open Camera
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden bg-black shadow-inner mb-6 border border-gray-200">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-auto object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
              </div>

              <div className="flex gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowCam(false)}
                  className="flex-1 sm:flex-none px-6 py-3 cursor-pointer rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-lg cursor-pointer text-sm font-medium text-white bg-black hover:bg-gray-800 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Capture
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}