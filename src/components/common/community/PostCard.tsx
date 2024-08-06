import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import CommentSection from "./CommentSection";

const PostCard = ({ author, content, updatedAt, images, likes, postId }) => {
  return (
    <div className="border-b border-gray-200 p-4">
      <PostHeader author={author} timestamp={updatedAt} />
      <PostContent content={content} images={images} />
      <PostActions likes={likes}  />
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostCard;
