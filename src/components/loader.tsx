import { Loading02Icon } from "hugeicons-react";

export default function Loader() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-5">
      <Loading02Icon className="animate-spin" />
      <div className="text-sm">데이터를 불러오는 중입니다.</div>
    </div>
  );
}
