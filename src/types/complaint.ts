import IResident from "./resident";

interface BaseComplaint {
  _id: string;
  title: string;
  description: string;
  isResolved: boolean;
  image: string;
  createdAt: string;
  recipientType: "caretaker" | "admin";
}

export interface CreateComplaint extends BaseComplaint {
  residentId: string;
}

export interface PopulatedComplaint extends BaseComplaint {
  residentId: IResident;
}

export type IComplaint = CreateComplaint | PopulatedComplaint;
