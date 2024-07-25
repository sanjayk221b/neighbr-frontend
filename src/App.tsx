import { ThemeProvider } from "@/components/theme-provider";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer />
      <Router>
        <AppRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
