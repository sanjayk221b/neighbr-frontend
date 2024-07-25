export default interface IResident {
    name: string;
    email: string;
    mobileNumber: string;
    apartmentNumber: string;
    isBlocked?: boolean;
    hasVehicle?: boolean;
    vehicles?: [string];
    image?: string;
  }