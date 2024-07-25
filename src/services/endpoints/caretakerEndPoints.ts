const caretakerRoutes = {
  caretakerLogin: "auth/caretaker/login",
  caretakerLogout: "auth/caretaker/logout",
  getVisitors: "management/visitors",
  updateVisitor: "management/visitors/",
  getAllComplaints: "/management/complaints/all",
  updateComplaint: "/management/complaints/update",
  getAllServiceRequests: "/management/services/requests/all",
  updateServiceRequests:'management/services/requests/:id/update'
};

export default caretakerRoutes;
