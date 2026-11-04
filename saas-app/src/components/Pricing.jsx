import React from "react";

const Pricing = () => {
  return (
    <section className="py-12 px-6 bg-gray-800">
      <h2 className="text-3xl font-semibold text-center text-white mb-10">
        Pricing Plans
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-800 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-2 text-white">Basics</h3>
          <p className="text-2xl font-semibold mb-4 text-blue-400">$19/mo</p>
          <ul className="text-sm text-gray-300 space-y-2 mb-4">
            <li>✔️ 1 Project</li>
            <li>✔️ Basic Support</li>
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Choose Plan
          </button>
        </div>

        <div className="bg-blue-800 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
          <p className="text-2xl font-semibold mb-4 text-blue-400">$49/mo</p>
          <ul className="text-sm text-gray-300 space-y-2 mb-4">
            <li>✔️ 10 Project</li>
            <li>✔️ Priority Support</li>
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Choose Plan
          </button>
        </div>
        <div className="bg-blue-800 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-2 text-white">Enterprise</h3>
          <p className="text-2xl font-semibold mb-4 text-blue-400">$99/mo</p>
          <ul className="text-sm text-gray-300 space-y-2 mb-4">
            <li>✔️ Unlimited Project</li>
            <li>✔️ 24/7 Support</li>
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Choose Plan
          </button>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
