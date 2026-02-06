import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks/mutations/use-reset-password";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const { mutate, isPending } = useResetPassword({
    onSuccess: () => {
      toast.info("비밀번호가 변경되었습니다.", { position: "top-center" });
      navigate("/");
    },
    onError: (error) => {
      toast.error("문제가 발생했습니다.", { position: "top-center" });
      setPassword("");
    },
  });

  const handleResetPassword = () => {
    if (!password.trim()) return;
    mutate(password);
  };

  return (
    <div>
      <h3 className="border-muted mb-4 border-b py-2 font-bold">
        비밀번호 재설정
      </h3>

      <Label className="text-muted-foreground mb-2">
        새로운 비밀번호를 입력하세요.
      </Label>
      <Input
        disabled={isPending}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className="flex justify-end">
        <Button
          disabled={isPending}
          className="mt-2"
          onClick={handleResetPassword}
        >
          새로운 비밀번호 저장
        </Button>
      </div>
    </div>
  );
}
