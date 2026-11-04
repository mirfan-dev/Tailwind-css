import React from "react";

const Feature = () => {
  return (
    <>
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-3xl font-semibold text-center text-white mb-10">
          Core Features
        </h2>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-700 rounded shadow text-center">
            <h3 className="font-bold text-lg mt-2 text-white">
              Fast Performance
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Optimized for speed and performance
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-700 rounded shadow text-center">
            <h3 className="font-bold text-lg mt-2 text-white">
              Responsive Design
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Mobile-first layout for all devices
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-700 rounded shadow text-center">
            <h3 className="font-bold text-lg mt-2 text-white">
              Easy Communication
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Style with utilities only
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
