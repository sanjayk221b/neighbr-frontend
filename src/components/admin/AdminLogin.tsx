import { useState, FormEvent } from "react";
import { adminLogin } from "../../services/api/admin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminLogin } from "../../redux/slices/authSlice";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    try {
      const token = await adminLogin(username, password);
      if (token) {
        console.log("Login successful:", token);
        dispatch(setAdminLogin());
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error during login. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-blue-200 flex justify-center items-center p-12">
          <img
            src="/neighbr.webp"
            alt="Neighbr Logo"
            className="max-w-full h-auto"
          />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
            Welcome
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-blue-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-blue-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
