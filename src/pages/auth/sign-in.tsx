import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useSignInWithPassword();

  const handleSignIn = () => {
    if (!email.trim()) return;
    if (!password.trim()) return;

    mutate({ email, password });
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
            disabled={isPending}
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="ml-1">비밀번호</FieldLabel>
          <Input
            disabled={isPending}
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            type="password"
          />
        </Field>

        {/* buttons */}
        <Field className="mt-4">
          <Button disabled={isPending} onClick={handleSignIn}>
            저장
          </Button>
          <Button disabled={isPending} variant={"secondary"} onClick={() => {}}>
            취소
          </Button>
        </Field>
      </FieldSet>
    </div>
  );
}
