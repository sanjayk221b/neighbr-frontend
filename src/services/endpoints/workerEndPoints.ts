export const workerRoutes = {
  addWorker: "/auth/workers/create",
  getWorkers: "/auth/workers",
  blockWorker: "/auth/workers/:id/block-unblock",
  updateAvailability: "/auth/workers/:id/availability",
};

export default workerRoutes;
