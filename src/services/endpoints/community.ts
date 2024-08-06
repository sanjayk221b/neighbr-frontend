const communityRoutes = {
  createPost: "/v1/community/posts/create",
  getPosts: "/v1/community/posts",
  createComment: "/v1/community/comments/:postId/create",
  getCommentsByPostId: "/v1/community/posts/:postId/comments",
};

export default communityRoutes;
