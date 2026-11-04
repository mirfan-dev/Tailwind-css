import React from "react";

const Home = () => {
  return (
    <>
      <section className="bg-gray-900 py-12 px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-8">
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-4xl font-bold text-white">
            Build Your Saas Website faster.
          </h2>
          <p className="text-gray-400">
            Tailwind CSS lets you build modern, responsive design without
            writing custom css.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://www.salesbabu.com/wp-content/uploads/2020/01/what-is-SAAS.png"
            className="rounded-lg shadow-md"
            alt="img"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
