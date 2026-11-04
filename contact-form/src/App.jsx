import "./App.css";
function App() {
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-600">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-blue-800 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-blue-800 rounded-md px-4 py-2"
            />
          </div>

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-blue-800 rounded-md px-4 py-2"
          />

          <textarea
            rows={5}
            placeholder="Enter Your Message"
            className="w-full border border-blue-800 rounded-md px-4 py-2"
          ></textarea>

          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 w-5 h-5"
            />
            <span className="text-gray-500 text-sm">
              I agree to the terms and conditions.
            </span>
          </label>

          <button className="bg-blue-600 w-full hover:bg-blue-950 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
