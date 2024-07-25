const adminRoutes = {
  adminLogin: "auth/admin/login",
  adminLogout: "auth/admin/logout",
  addResident: "auth/admin/residents/create",
  getResidents: "auth/admin/residents",
  blockUnblockResident: "auth/admin/residents/:id/block-unblock",
  getCaretakers: "auth/admin/caretakers",
  addCaretaker: "auth/admin/caretakers/create",
  blockUnblockCaretaker: "auth/admin/caretakers/:id/block-unblock",
};

export default adminRoutes;
