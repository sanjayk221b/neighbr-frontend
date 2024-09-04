export interface IAnnouncement {
  _id?: string;
  title: string;
  content: string;
  date: string;
  type?: "Event" | "News" | "Update";
  status?: "Active" | "Draft" | "Archived";
  readBy?: string[];
}
