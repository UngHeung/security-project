import Menu from "@/components/ui/base/menu";
import ProfileButton from "@/components/ui/base/profile-button";
import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <div className="mx-auto max-w-lg px-4">
      <header className="flex h-12.5 items-center justify-between">
        <h2 className="basis-2/6">보안가이드</h2>
        <div className="basis-3/6">
          <Menu />
        </div>
        <div className="flex basis-1/6 justify-center gap-1">
          <ProfileButton />
        </div>
      </header>
      <main className="max-h-[calc(100vh-var(--spacing)*16.5)] pt-4">
        <Outlet />
      </main>
    </div>
  );
}
