import { IResident } from "./resident";

export interface IPost {
  _id: string;
  author: {
    id: IResident;
  };
  content: string;
  images?: string[];
  likes: string[];
  comments: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  author: {
    id: IResident;
  };
  content: string;
  postId: string;
}
