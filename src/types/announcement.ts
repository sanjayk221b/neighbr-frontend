export interface IAnnouncement {
  _id?: string;
  title: string;
  content: string;
  date: Date;
  type?: "Event" | "News" | "Update";
  status?: "Active" | "Draft" | "Archived";
  readBy?: string[];
}
