import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/ui/base/global-layout";
import DashboardPage from "./pages/dashboard";
import SearchPage from "./pages/search";
import GuideDetailPage from "./pages/guide-detail";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/guide/:id" element={<GuideDetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
