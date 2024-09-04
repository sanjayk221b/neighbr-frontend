import axiosInstance from "@/config/axiosConfig";
import communityRoutes from "../endpoints/community";

export const createPost = async (formData: FormData) => {
  const response = await axiosInstance.post(
    communityRoutes.createPost,
    formData
  );
  return response.data;
};

export const getPosts = async () => {
  const response = await axiosInstance.get(communityRoutes.getPosts);
  return response.data;
};

export const getPostById = async (id: string) => {
  const url = communityRoutes.getPostById.replace(":postId", id);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const deletePost = async (postId: string) => {
  const url = communityRoutes.deletePost.replace(":postId", postId);
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const createComment = async (postId: string, content: string) => {
  const url = communityRoutes.createComment.replace(":postId", postId);
  const response = await axiosInstance.post(url, { content });
  return response.data;
};

export const getCommentsByPostId = async (postId: string) => {
  const url = communityRoutes.getCommentsByPostId.replace(":postId", postId);
  const response = await axiosInstance.get(url);
  console.log(response.data);
  return response.data;
};

export const reportPost = async (postId: string, reason: string) => {
  const url = communityRoutes.reportPost.replace(":postId", postId);
  const response = await axiosInstance.post(url, { reason });
  return response.data;
};

export const getReports = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get(communityRoutes.getReports, {
    params: { page, limit },
  });
  return response.data;
};
