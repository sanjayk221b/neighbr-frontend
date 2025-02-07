import { useState } from "react";
import { FormSubmitEvent } from "@/types";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "@/services/api/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ForgotPasswordProps {
  userType: "resident" | "caretaker";
}

const ForgotPassword = ({ userType }: ForgotPasswordProps) => {
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

    const res = await sendOtp(email, userType);
    if (res.success) {
      setMessage("OTP has been sent to your email.");
      navigate(`/verify-otp`, { state: { userType, email } });
    } else {
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="max-w-lg md:w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" className="text-blue-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="Enter your email"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {message && (
            <Alert variant="default" className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
