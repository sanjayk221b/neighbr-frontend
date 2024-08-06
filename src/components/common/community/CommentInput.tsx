import React, { useState } from "react";

interface CommentInputProps {
  postId: string;
  createComment: (postId: string, content: string) => Promise<void>;
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  createComment,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await createComment(postId, content);
      setContent(""); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-4">
      <input
        type="text"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow mr-2 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 focus:outline-none"
      >
        Post
      </button>
    </form>
  );
};

export default CommentInput;
