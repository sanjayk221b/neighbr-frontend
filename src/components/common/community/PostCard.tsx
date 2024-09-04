import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import CommentSection from "./CommentSection";
import PostOptions from "./PostOptions";
import { IPost } from "@/types/community";
import { IResident } from "@/types";

interface PostCardProps {
  author: IResident;
  content: IPost["content"];
  updatedAt: IPost["updatedAt"];
  images?: IPost["images"];
  likes: IPost["likes"];
  postId: IPost["_id"];
  onDelete: (postId: string) => void;
  currentUser: IResident | null;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  updatedAt,
  images,
  likes,
  postId,
  onDelete,
  currentUser,
}) => {
  return (
    <div className="border-b border-gray-200 p-4 relative">
      <div className="absolute top-4 right-4">
        <PostOptions
          postId={postId}
          onDelete={onDelete}
          author={author}
          currentUser={currentUser!}
        />
      </div>
      <PostHeader author={author} timestamp={updatedAt} />
      <PostContent content={content} images={images} />
      <PostActions likes={likes} />
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostCard;
