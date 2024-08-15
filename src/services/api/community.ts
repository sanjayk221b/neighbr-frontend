import axiosInstance from "@/config/axiosConfig";
import communityRoutes from "../endpoints/community";

export const createPost = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      communityRoutes.createPost,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get(communityRoutes.getPosts);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const createComment = async (postId: string, content: string) => {
  try {
    const url = communityRoutes.createComment.replace(":postId", postId);
    const response = await axiosInstance.post(url, { content });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getCommentsByPostId = async (postId: string) => {
  try {
    const response = await axiosInstance.get(
      communityRoutes.getCommentsByPostId.replace(":postId", postId)
    );
    return response.data;
  } catch (error) {
    console.error("Error getting comments by post ID:", error);
    throw error;
  }
};
