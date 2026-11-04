import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-wrap gap-6 bg-gray-100 justify-center">
        <div className="bg-white shadow-md p-4 rounded-lg w-64">
          <h2 className="text-xl font-bold mb-2 text-center">Card 1 </h2>
          <p className="text-gray-600 text-center">This is a Card1</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg w-64">
          <h2 className="text-xl font-bold mb-2 text-center">Card 2 </h2>
          <p className="text-gray-600 text-center">This is a Card 2</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg w-64">
          <h2 className="text-xl font-bold mb-2 text-center">Card 3 </h2>
          <p className="text-gray-600 text-center">This is a Card 3</p>
        </div>
      </div>
    </>
  );
}

export default App;
