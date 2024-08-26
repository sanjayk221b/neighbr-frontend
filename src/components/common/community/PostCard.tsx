import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import CommentSection from "./CommentSection";
import PostOptions from "./PostOptions";

const PostCard = ({ author, content, updatedAt, images, likes, postId, onDelete }) => {
  return (
    <div className="border-b border-gray-200 p-4 relative">
      <div className="absolute top-4 right-4">
        <PostOptions postId={postId} onDelete={onDelete} />
      </div>
      <PostHeader author={author} timestamp={updatedAt} />
      <PostContent content={content} images={images} />
      <PostActions likes={likes} />
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostCard;