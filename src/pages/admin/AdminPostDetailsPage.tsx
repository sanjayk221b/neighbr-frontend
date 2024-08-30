import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams
import AdminNavbar from "../../components/admin/navbar/AdminNavbar";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import CommunityFeed from "@/components/common/community/CommunityFeed";
import { RootState } from "@/redux/store";
import { getPostById } from "@/services/api/community";
import ShimmerCommunityFeed from "@/components/common/community/shimmer/ShimmerCommunityFeed";

const AdminPostDetailsPage = () => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const adminInfo = useSelector((state: RootState) => state.auth.adminInfo);
  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const response = await getPostById(postId);
        console.log(response);
        setPost(response.data);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {loading ? (
            <ShimmerCommunityFeed />
          ) : (
            post && (
              <CommunityFeed initialPosts={post} currentUser={adminInfo} />
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPostDetailsPage;
