import { useState } from "react";
import NewPostInput from "./NewPostInput";
import PostCard from "./PostCard";
import { createPost, deletePost } from "@/services/api/community";
import { IPost } from "@/types/community";
import { IResident } from "@/types";

interface CommunityFeedProps {
  initialPosts: IPost[];
  currentUser: IResident | null;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({
  initialPosts,
  currentUser,
}) => {
  const [posts, setPosts] = useState(initialPosts);

  const handleNewPost = async (formData: FormData) => {
    const newPost = await createPost(formData);
    setPosts([newPost.data, ...posts]);
  };

  const handleDeletePost = async (postId: string) => {
    const res = await deletePost(postId);
    if (res.success) setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <NewPostInput onSubmit={handleNewPost} currentUser={currentUser!} />

      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl"
          >
            <PostCard
              postId={post._id}
              author={post.author.id}
              content={post.content}
              updatedAt={post.updatedAt}
              images={post?.images}
              likes={post.likes}
              onDelete={handleDeletePost}
              currentUser={currentUser}
            />
          </div>
        ))
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-600">
            Be the first to share something with the community!
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
