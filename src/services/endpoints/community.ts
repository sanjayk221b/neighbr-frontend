const communityRoutes = {
  createPost: "/v1/community/posts/create",
  getPosts: "/v1/community/posts",
  getPostById:"/v1/community/posts/:postId",
  createComment: "/v1/community/comments/:postId/create",
  getCommentsByPostId: "/v1/community/posts/:postId/comments",
  reportPost: "/v1/community/posts/:postId/reports/create",
  getReports: "/v1/community/posts/reports"
};

export default communityRoutes;
