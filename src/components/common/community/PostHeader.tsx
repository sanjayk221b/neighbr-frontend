import React from "react";
import moment from "moment";
import { IResident } from "@/types";

interface PostHeaderProps {
  author: IResident;
  timestamp: Date;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, timestamp }) => {
  const relativeTimestamp = moment(timestamp).fromNow();
  return (
    <div className="flex items-center mb-4">
      <img
        src={author.image}
        alt={author.name}
        className="w-10 h-10 rounded-full mr-3"
      />

      <div>
        <h3 className="font-semibold text-sm">{author.name}</h3>
        <span className="text-xs text-gray-500">{relativeTimestamp}</span>
      </div>
    </div>
  );
};

export default PostHeader;
