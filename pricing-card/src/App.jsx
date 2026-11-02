import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm text-center">
          <h2 className="text-2xl font-bold text-black-900 mb-2">Pro Plan</h2>
          <p className="text-white-200 leading-relaxed mb-4">
            Ideal for developer and startups who want power and performance
          </p>
          <div className="text-4xl font-bold text-blue-900 mb-6">
            ₹900 <span className="text-gray text-sm">/mo</span>
          </div>
          <ul className="text-left text-gray-500 space-y-2 mb-6">
            <li>☑️ Unlimited Projects</li>
            <li>☑️ 100 GB storage</li>
            <li>☑️ Priority support</li>
          </ul>
          <button className="bg-blue-600 hover:bg-blue-950 text-white px-6 py-2 rounded-lg transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
