export interface IResident {
  _id?: string;
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  isAdmin: boolean;
  isBlocked?: boolean;
  hasVehicle: boolean;
  vehicles?: string[];
  image?: string;
}
