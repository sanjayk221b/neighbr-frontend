import axiosInstance from "@/config/axiosConfig";
import otpRoutes from "../endpoints/otpEndpoints";

export const sendOtp = async (email: string, userType: string) => {
  const response = await axiosInstance.post(otpRoutes.sendOtp, {
    email,
    userType,
  });
  return response.data;
};

export const verifyOtp = async (
  email: string,
  otp: string,
  userType: string
) => {
  const response = await axiosInstance.post(otpRoutes.verifyOtp, {
    email,
    otp,
    userType,
  });
  return response.data;
};
