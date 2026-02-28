import { Outlet } from "react-router";

type PostType = "guide" | "notice";

interface PostLayoutProps {
  type: PostType;
}

export default function PostLayout({ type }: PostLayoutProps) {
  return (
    <>
      <h3 className="border-muted mb-4 border-b py-2 font-bold">
        {type === "guide" ? "가이드" : "공지사항"}
      </h3>
      <Outlet />
    </>
  );
}
