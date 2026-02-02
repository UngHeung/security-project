import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <>
      <header>
        <h2>보안가이드 프로젝트</h2>
      </header>
      <main>
        <Outlet />
      </main>
      ;
    </>
  );
}
