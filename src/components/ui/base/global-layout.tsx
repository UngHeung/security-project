import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Menu from "./menu";
import ProfileButton from "./profile-button";

export default function GlobalLayout() {
  return (
    <div className="mx-auto max-w-lg px-4">
      <header className="flex h-12.5 items-center justify-between">
        <h2 className="basis-1/5">보안가이드</h2>
        <div className="basis-3/5">
          <Menu />
        </div>
        <div className="flex basis-1/5 gap-1">
          <ProfileButton size={20} />
        </div>
      </header>
      <main className="max-h-[calc(100vh-var(--spacing)*12.5)]">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
