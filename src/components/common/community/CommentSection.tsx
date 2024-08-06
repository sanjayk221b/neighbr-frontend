import { useEffect, useState } from "react";
import { getCommentsByPostId, createComment } from "@/services/api/community";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface IComment {
  author: string;
  content: string;
  postId: string;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await getCommentsByPostId(postId);
        setComments(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCreateComment = async (postId: string, content: string) => {
    try {
      await createComment(postId, content);
      setComments((prevComments) => [
        ...prevComments,
        { postId, content, author: "You" },
      ]);
    } catch (error) {
      setError("Error creating comment");
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment
            key={index}
            author={comment.author}
            content={comment.content}
          />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <CommentInput postId={postId} createComment={handleCreateComment} />
    </div>
  );
};

export default CommentSection;
