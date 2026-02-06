import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/ui/base/global-layout";
import ForgetPasswordPage from "./pages/auth/forget-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import DashboardPage from "./pages/dashboard";
import GuideDetailPage from "./pages/post/guide-detail";
import GuideEditPage from "./pages/post/guide-edit";
import SearchPage from "./pages/search/search";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/guide/:id" element={<GuideDetailPage />} />
        <Route path="/guide/write" element={<GuideEditPage type="create" />} />
        <Route path="/guide/update" element={<GuideEditPage type="update" />} />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
