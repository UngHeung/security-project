import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { generateErrorMessage } from "@/lib/error";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error);

      toast.error(message, { position: "top-center" });
    },
    onSuccess: () => {
      toast.message("회원가입 성공", { position: "top-center" });
      navigate("/sign-in");
    },
  });

  const handleSignUp = () => {
    if (!email.trim()) {
      toast.error("이메일을 확인해주세요.", { position: "top-center" });
      emailRef.current!.focus();
      return;
    }

    if (!password.trim() || password !== checkPassword) {
      toast.error("비밀번호를 확인해주세요.", { position: "top-center" });
      passwordRef.current!.focus();
      return;
    }

    signUp({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col">
      <h3 className="border-muted mb-4 border-b py-2 font-bold">회원가입</h3>

      {/* input field */}
      <FieldSet className="flex flex-col gap-2">
        {/* email */}
        <Field>
          <FieldLabel className="ml-1">이메일</FieldLabel>
          <Input
            type="email"
            value={email}
            ref={emailRef}
            disabled={isSignUpPending}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="abcd@example.com"
          />
          <FieldDescription className="ml-1">
            비밀번호 변경 및 초기화에 사용됩니다.
          </FieldDescription>
        </Field>

        {/* password */}
        <FieldGroup>
          <Field>
            <FieldLabel className="ml-1">비밀번호</FieldLabel>
            <Input
              value={password}
              ref={passwordRef}
              disabled={isSignUpPending}
              onChange={(event) => setPassword(event?.target.value)}
              type="password"
            />
          </Field>
          <Field>
            <FieldLabel className="ml-1">비밀번호확인</FieldLabel>
            <Input
              value={checkPassword}
              disabled={isSignUpPending}
              onChange={(event) => setCheckPassword(event?.target.value)}
              type="password"
            />
            {password !== checkPassword && checkPassword.length > 0 && (
              <FieldDescription className="text-destructive ml-1">
                비밀번호가 다릅니다.
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>

        {/* buttons */}
        <Field className="mt-4">
          <Button disabled={isSignUpPending} onClick={handleSignUp}>
            저장
          </Button>
        </Field>

        <div className="flex items-center justify-end pr-0.5">
          <Link className="text-muted-foreground text-xs" to={"/sign-in"}>
            로그인
          </Link>
        </div>
      </FieldSet>
    </div>
  );
}
