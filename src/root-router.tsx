import { Navigate, Route, Routes } from "react-router";
import GlobalLayout from "./components/ui/base/global-layout";
import DashboardPage from "./pages/dashboard";
import GuideDetailPage from "./pages/guide-detail";
import GuideEditPage from "./pages/guide-edit";
import SearchPage from "./pages/search";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/guide/:id" element={<GuideDetailPage />} />
        <Route path="/guide/write" element={<GuideEditPage type="CREATE" />} />
        <Route path="/guide/update" element={<GuideEditPage type="UPDATE" />} />
      </Route>

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}
