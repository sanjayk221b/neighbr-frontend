const CaretakerDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-blue-800">
              Welcome, Caretaker!
            </h1>
            <p className="text-gray-600 mb-4">
              We're glad to have you here. Your role is crucial in maintaining
              our properties and ensuring tenant satisfaction.
            </p>
            <div
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4"
              role="alert"
            >
              <p className="font-bold">Quick Overview:</p>
              <ul className="list-disc list-inside">
                <li>You have 3 pending tasks</li>
                <li>2 new maintenance requests</li>
                <li>Upcoming property inspection on Friday</li>
              </ul>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
              View Tasks
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Neighbr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CaretakerDashboard;
