import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import communityRoutes from "../endpoints/community";

const communityApi = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
});

export const createPost = async (formData: FormData) => {
  try {
    const response = await communityApi.post(
      communityRoutes.createPost,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await communityApi.get(communityRoutes.getPosts);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const createComment = async (postId: string, content: string) => {
  try {
    const url = communityRoutes.createComment.replace(":postId", postId);
    const response = await communityApi.post(url, { content });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getCommentsByPostId = async (postId: string) => {
  try {
    const response = await communityApi.get(
      communityRoutes.getCommentsByPostId.replace(":postId", postId)
    );
    return response.data;
  } catch (error) {
    console.error("Error getting comments by post ID:", error);
    throw error;
  }
};
