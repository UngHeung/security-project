import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks/mutations/use-reset-password";
import { generateErrorMessage } from "@/lib/error";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate: resetPassword, isPending: isResetPasswordPending } =
    useResetPassword({
      onSuccess: () => {
        toast.info("비밀번호가 변경되었습니다.", { position: "top-center" });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });
        setPassword("");
        passwordRef.current?.focus();
      },
    });

  const handleResetPassword = () => {
    if (!password.trim()) {
      toast.error("비밀번호를 확인하세요.", { position: "top-center" });
      passwordRef.current?.focus();
      return;
    }

    resetPassword(password);
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
        disabled={isResetPasswordPending}
        type="password"
        value={password}
        ref={passwordRef}
        onChange={(event) => setPassword(event.target.value)}
      />

      <div className="flex justify-end">
        <Button
          disabled={isResetPasswordPending}
          className="mt-4 w-full"
          onClick={handleResetPassword}
        >
          새로운 비밀번호 저장
        </Button>
      </div>
    </div>
  );
}
