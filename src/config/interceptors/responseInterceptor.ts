export const responseInterceptor = (error: any) => {
  if (error.response && error.response.status === 401) {
    const currentPath = window.location.pathname;

    if (currentPath.includes("/resident/")) {
      localStorage.removeItem("residentLoggedIn");
      localStorage.removeItem("residentInfo");
      window.location.href = "/resident/";
    } else if (currentPath.includes("/caretaker/")) {
      localStorage.removeItem("caretakerLoggedIn");
      localStorage.removeItem("caretakerInfo");
      window.location.href = "/caretaker/";
    } else if (currentPath.includes("/admin/")) {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminInfo");
      window.location.href = "/admin/";
    } else {
      window.location.href = "/login";
    }
  }

  console.error("API Error:", error);
  return Promise.reject(error);
};
