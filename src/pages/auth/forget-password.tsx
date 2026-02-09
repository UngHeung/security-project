import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/use-request-password-reset-email";
import { generateErrorMessage } from "@/lib/error";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("인증메일 발송 완료", { position: "top-center" });
      navigate("/sign-in");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
    },
  });

  const handleSendEmail = () => {
    if (!email.trim()) {
      toast.error("이메일을 작성해주세요.", { position: "top-center" });
      emailRef.current?.focus();
      return;
    }

    requestPasswordResetEmail(email);
  };

  return (
    <div>
      <h3 className="border-muted mb-4 border-b py-2 font-bold">
        비밀번호 재설정
      </h3>

      <Label className="text-muted-foreground mb-2">
        등록된 이메일로 비밀번호 재설정 링크 발송
      </Label>

      <Input
        disabled={isRequestPasswordResetEmailPending}
        type="email"
        value={email}
        ref={emailRef}
        onChange={(event) => setEmail(event.target.value)}
      />

      <div className="flex justify-end">
        <Button
          disabled={isRequestPasswordResetEmailPending}
          className="mt-2"
          onClick={handleSendEmail}
        >
          링크 발송
        </Button>
      </div>
    </div>
  );
}
