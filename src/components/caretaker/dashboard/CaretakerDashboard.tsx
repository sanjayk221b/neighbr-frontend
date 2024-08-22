const CaretakerDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-primary">
              Welcome, Caretaker!
            </h1>
            <p className="text-muted mb-4">
              We're glad to have you here. Your role is crucial in maintaining
              our properties and ensuring tenant satisfaction.
            </p>
            <div
              className="bg-accent border-l-4 border-accent-foreground text-accent-foreground p-4 mb-4"
              role="alert"
            >
              <p className="font-bold">Quick Overview:</p>
              <ul className="list-disc list-inside">
                <li>You have 3 pending tasks</li>
                <li>2 new maintenance requests</li>
                <li>Upcoming property inspection on Friday</li>
              </ul>
            </div>
            <button className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-2 px-4 rounded-md transition duration-300">
              View Tasks
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-card shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted text-sm">
            © 2024 Neighbr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CaretakerDashboard;
