import React, { useContext } from "react";
import UserContext from "../../context/user.context";

const Home = () => {

   const userContext = useContext(UserContext);
  return (
    <>
      <section className="bg-gray-900 py-12 px-6 flex flex-col-reverse md:flex-row items-center justify-center gap-8">
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="text-4xl font-bold text-white">
            Build Your Saas Website faster.
          </h2>
          <p className="text-gray-400">
            E-commerce (electronic commerce) is the buying and selling of goods and services over the internet using computers, smartphones, tablets, and digital platforms.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://static.wingify.com/gcp/uploads/sites/18/2022/12/eCommerce.png"
            className="rounded-lg shadow-md"
            alt="img"
          />
        </div>
      </section>
    </>
  );
};

export default Home;