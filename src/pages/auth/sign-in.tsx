import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { generateErrorMessage } from "@/lib/error";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate: signIn, isPending: isSignInPending } = useSignInWithPassword({
    onError: (error) => {
      const message = generateErrorMessage(error);

      toast.error(message, {
        position: "top-center",
      });

      passwordRef.current!.focus();
    },
    onSuccess: () => {
      toast.message("로그인 성공", { position: "top-center" });
    },
  });

  const handleSignIn = () => {
    if (!email.trim()) {
      toast.error("이메일을 확인해주세요.", { position: "top-center" });
      emailRef.current!.focus();
      return;
    }

    if (!password.trim()) {
      toast.error("비밀번호를 확인해주세요.", { position: "top-center" });
      passwordRef.current!.focus();
      return;
    }

    signIn({ email, password });
  };

  return (
    <div>
      <h3 className="border-muted mb-4 border-b py-2 font-bold">로그인</h3>

      {/* input field */}
      <FieldSet className="flex flex-col gap-2">
        {/* email */}
        <Field>
          <FieldLabel className="ml-1">이메일</FieldLabel>
          <Input
            disabled={isSignInPending}
            ref={emailRef}
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="ml-1">비밀번호</FieldLabel>
          <Input
            disabled={isSignInPending}
            ref={passwordRef}
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            type="password"
          />
        </Field>

        {/* buttons */}
        <Field className="mt-2">
          <Button disabled={isSignInPending} onClick={handleSignIn}>
            저장
          </Button>
        </Field>

        <div className="flex items-center justify-end gap-1 pr-0.5">
          <Link className="text-muted-foreground text-xs" to={"/sign-up"}>
            회원가입
          </Link>
          <span className="text-muted text-xs">|</span>
          <Link
            className="text-muted-foreground text-xs"
            to={"/forget-password"}
          >
            비밀번호찾기
          </Link>
        </div>
      </FieldSet>
    </div>
  );
}
