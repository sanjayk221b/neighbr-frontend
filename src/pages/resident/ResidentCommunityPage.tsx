import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ResidentNavbar from "@/components/resident/navbar/ResidentNavbar";
import CommunityFeed from "@/components/common/community/CommunityFeed";
import { RootState } from "@/redux/store";
import { getPosts } from "@/services/api/community";
import ShimmerCommunityFeed from "@/components/common/community/shimmer/ShimmerCommunityFeed";

const ResidentCommunityPage = () => {
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
    <div className="shadow-2xl">
      <ResidentNavbar />
      <div className="pt-5 bg-gradient-to-br from-gray-100 to-blue-100 shadow-md">
        {loading ? (
          <ShimmerCommunityFeed />
        ) : (
          <CommunityFeed initialPosts={posts} currentUser={residentInfo} />
        )}
      </div>
    </div>
  );
};

export default ResidentCommunityPage;
