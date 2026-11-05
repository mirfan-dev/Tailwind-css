import { useState, useRef,useEffect } from "react";
import "./App.css";

function App() {
  const otpLength = 6;
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    const copyOtpFields = [...otpFields];

    if(key === 'Backspace'){
      copyOtpFields[index] = "";
      setOtpFields(copyOtpFields)
      if ( index > 0) inputRefs.current[index - 1]?.focus();
      return;
    }
    if (isNaN(key)) {
      return;
    }
    copyOtpFields[index] = key;
    
    if ( index  < otpFields.length -1 ) {
      inputRefs.current[index + 1].focus();
    }
    setOtpFields(copyOtpFields);
  };

  useEffect(() => {
    inputRefs.current["0"].focus();
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-2">
  <div className="flex gap-2">
      {otpFields.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-10 h-12 sm:w-12 text-center text-lg border rounded
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
