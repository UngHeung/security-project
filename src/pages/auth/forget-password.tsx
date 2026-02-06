import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/use-request-password-reset-email";
import { toast } from "sonner";

// 임시
const myEmail = "beehive2838@naver.com";

export default function ForgetPasswordPage() {
  const { mutate, isPending } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("인증메일 발송 완료", { position: "top-center" });
    },
    onError: () => {
      toast.error("에러가 발생했습니다.", { position: "top-center" });
    },
  });

  const handleSendEmail = () => {
    mutate(myEmail);
  };

  return (
    <div>
      <h2 className="border-muted mb-4 border-b py-2 font-bold">
        비밀번호 재설정
      </h2>

      <Label className="text-muted-foreground">
        등록된 이메일로 비밀번호 재설정 링크 발송
      </Label>

      <div className="flex justify-end">
        <Button disabled={isPending} className="mt-2" onClick={handleSendEmail}>
          링크 발송
        </Button>
      </div>
    </div>
  );
}
