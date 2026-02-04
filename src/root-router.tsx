import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/ui/base/global-layout";
import DashboardPage from "./pages/dashboard";
import GuideDetailPage from "./pages/guide-detail";
import GuideEditPage from "./pages/guide-edit";
import SearchPage from "./pages/search";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/guide/:id" element={<GuideDetailPage />} />
        <Route path="/guide/write" element={<GuideEditPage type="CREATE" />} />
        <Route path="/guide/update" element={<GuideEditPage type="UPDATE" />} />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
