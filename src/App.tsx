import AppRouter from "./routes/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  return (
    // <SocketProvider>
    <>
      <ToastContainer />
      <Router>
        <AppRouter />
      </Router>
      {/* // </SocketProvider> */}
    </>
  );
}

export default App;
