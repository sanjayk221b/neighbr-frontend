const residentRoutes = {
  residentLogin: "auth/resident/login",
  residentLogout: "auth/resident/logout",
  changePassword: "auth/resident/change-password",
  addVisitor: "management/visitors/create",
  getVisitors: (page: number, limit: number) => `management/visitors/all?page=${page}&limit=${limit}`,
  addServiceRequest: "/management/services/request",
  getServiceRequests: (page: number, limit: number, searchTerm: string) => `/management/services/requests?page=${page}&limit=${limit}&search=${searchTerm}`,
  addComplaint: "/management/complaints/create",
  getComplaints: "/management/complaints/",
};

export default residentRoutes;
