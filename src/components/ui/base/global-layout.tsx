import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <div className="mx-auto max-w-lg p-4">
      <header className="h-12.5">
        <h2 className="text-center">보안가이드 프로젝트</h2>
      </header>
      <main className="max-h-[calc(100vh-var(--spacing)*20.5)]">
        <Outlet />
      </main>
    </div>
  );
}
