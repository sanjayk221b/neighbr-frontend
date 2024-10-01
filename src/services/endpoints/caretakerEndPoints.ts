const caretakerRoutes = {
  caretakerLogin: "auth/caretaker/login",
  caretakerLogout: "auth/caretaker/logout",
  changePassword: "auth/caretaker/change-password",
  getVisitors: "management/visitors",
  updateVisitor: "management/visitors/",
  getAllComplaints: "/management/complaints/all/caretaker",
  updateComplaint: "/management/complaints/update",
  getAllServiceRequests: "/management/services/requests/all",
  updateServiceRequests: "management/services/requests/:id/update",
  getCaretakerDashboardData: "/management/dashboard/caretaker"
};

export default caretakerRoutes;
