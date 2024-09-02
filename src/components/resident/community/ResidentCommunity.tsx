import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPosts } from "@/services/api/community";
import CommunityFeed from "@/components/common/community/CommunityFeed";
import ShimmerCommunityFeed from "@/components/common/community/shimmer/ShimmerCommunityFeed";

const ResidentCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <ShimmerCommunityFeed />
      ) : (
        <CommunityFeed initialPosts={posts} currentUser={residentInfo} />
      )}
    </div>
  );
};

export default ResidentCommunity;
