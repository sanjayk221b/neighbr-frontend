export interface IVisitor {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  image: File | string | null;
  hasVehicle: boolean;
  vehicleNumber: string;
  checkinDate: string;
  checkinTime: string;
  purpose: string;
  checkoutTime?: string;
  isApproved: boolean;
  isBlocked: boolean;
}
