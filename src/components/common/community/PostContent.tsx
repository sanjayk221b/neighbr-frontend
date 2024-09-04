import React from "react";

interface PostContentProps {
  content: string;
  images?: string[];
}

const PostContent: React.FC<PostContentProps> = ({ content, images }) => {
  return (
    <div className="mb-4">
      <p className="text-sm mb-2">{content}</p>
      {images &&
        images.length > 0 &&
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Post content"
            className="w-full rounded-lg"
          />
        ))}
    </div>
  );
};

export default PostContent;
