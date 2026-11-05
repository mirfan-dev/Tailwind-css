import React, { useState } from "react";
import Home from "./Home";
import Feature from "./Feature";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "./Footer";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 text-white sticky top-0 z-50">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Desktop Menu */}
          <h1 className="text-blue-700 font-bold text-2xl">Irfan</h1>

          <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <li>
              <a href="#" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Feature
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile menu icon */}
          <div className="md:hidden">
            <button
              className="text-2xl text-white"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              &#9776;
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all ${open ? "max-h-64" : "max-h-0"}`}
        >
          <ul className="flex flex-col gap-3 px-6 pb-4 text-gray-300 font-medium">
            <li>
              <a href="#" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Feature
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      
    </>
  );
};

export default Navbar;
