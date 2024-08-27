import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../../components/admin/navbar/AdminNavbar";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import CommunityFeed from "@/components/common/community/CommunityFeed";
import { RootState } from "@/redux/store";
import { getPosts } from "@/services/api/community";
import ShimmerCommunityFeed from "@/components/common/community/shimmer/ShimmerCommunityFeed";

const AdminCommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(respons);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {loading ? (
            <ShimmerCommunityFeed />
          ) : (
            <CommunityFeed initialPosts={posts} currentUser={adminInfo} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCommunityPage;
