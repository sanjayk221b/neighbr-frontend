import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormSubmitEvent } from "@/types";
import { verifyOtp } from "@/services/api/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { userType, email } = location.state as {
    userType: string;
    email: string;
  };

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    const res = await verifyOtp(email, otp, userType);

    if (res?.success) {
      if (userType === "resident") {
        navigate("/home");
      } else if (userType === "caretaker") {
        navigate("/caretaker/home");
      }
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="max-w-lg md:w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="otp" className="text-blue-700">
              Enter OTP
            </Label>
            <Input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1"
              placeholder="Enter the OTP sent to your email"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
