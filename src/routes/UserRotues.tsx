import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { NLoader } from "@/components/ui/loader";
import UserHomePage from "@/pages/user/UserHomePage";

const UserRoutes = () => {
  return (
    <Suspense fallback={<NLoader />}>
      <Routes>
        <Route path="/" element={<UserHomePage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
