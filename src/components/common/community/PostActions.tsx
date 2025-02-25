import { useState } from "react";
import { toggleLikePost } from "@/services/api/community";

interface PostActionsProps {
  postId: string;
  likes: number;
  hasLiked: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  likes,
  hasLiked,
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(hasLiked);

  const handleLike = async () => {
    try {
      await toggleLikePost(postId);
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="flex items-center mb-4">
      <button
        onClick={handleLike}
        className={`flex items-center mr-4 text-sm ${
          liked ? "text-blue-500" : "text-gray-500"
        } hover:text-blue-500`}
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        <span>{likeCount}</span>
      </button>
    </div>
  );
};

export default PostActions;
