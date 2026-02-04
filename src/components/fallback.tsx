import { Alert02Icon } from "hugeicons-react";

export default function FallBack() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
      <Alert02Icon className="h-6 w-6" />
      <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
    </div>
  );
}
