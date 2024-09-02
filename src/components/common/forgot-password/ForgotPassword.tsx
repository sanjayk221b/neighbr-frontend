import { useState } from "react";
import { FormSubmitEvent } from "@/types";
// import { residentForgotPassword } from "../../../services/api/resident";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    try {
      //   await residentForgotPassword(email);
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Error sending reset email. Please try again later.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-blue-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter your email"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {message && (
            <div className="text-green-500 text-sm mb-4">{message}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleBackToLogin}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
