export default interface IResident {
  _id?: string;
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  isBlocked?: boolean;
  hasVehicle?: boolean;
  vehicles?: [string];
  image?: string;
}