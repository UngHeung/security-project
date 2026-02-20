import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/ui/layouts/global-layout";
import GuestOnlyLayout from "./components/ui/layouts/guest-only-layout";
import MemberOnlyLayout from "./components/ui/layouts/member-only-layout";
import PostLayout from "./components/ui/layouts/post-layout";
import ForgetPasswordPage from "./pages/auth/forget-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import DashboardPage from "./pages/dashboard";
import GuideDetailPage from "./pages/post/guide-detail";
import GuideEditPage from "./pages/post/guide-edit";
import GuideList from "./pages/post/guide-list";
import ProfileDetailPage from "./pages/profile/profile-detail";
import ProfileUpdate from "./pages/profile/profile-update";
import SearchPage from "./pages/search/search";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          {/* auth */}
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route path="/" element={<DashboardPage />} />

        {/* search */}
        <Route path="/search" element={<SearchPage />} />

        {/* guide */}
        <Route element={<PostLayout type="guide" />}>
          <Route path="/guide/:id" element={<GuideDetailPage />} />
          <Route path="/guide" element={<GuideList />} />
        </Route>

        <Route element={<MemberOnlyLayout />}>
          {/* auth */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* profile */}
          <Route
            path="/my-profile"
            element={<ProfileDetailPage isMyProfile={true} />}
          />
          <Route
            path="/profile"
            element={<ProfileDetailPage isMyProfile={false} />}
          />
          <Route path="/profile-update" element={<ProfileUpdate />} />

          {/* guide */}
          <Route element={<PostLayout type="guide" />}>
            <Route path="/guide/write" element={<GuideEditPage />} />
            <Route path="/guide/update/:id" element={<GuideEditPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
