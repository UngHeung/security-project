import { signUp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type PositionType = "파트장" | "팀장" | "책임" | "선임" | "주임" | "사원";

type AvatarType = {
  file: File;
  avatarUrl: string;
};

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <div className="flex flex-col gap-20">
      <h3 className="border-muted mb-4 border-b py-2 font-bold">회원가입</h3>

      {/* input field */}
      <FieldSet className="flex flex-col gap-2">
        {/* email */}
        <Field>
          <FieldLabel className="ml-1">이메일</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
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
              onChange={(event) => setPassword(event?.target.value)}
              type="password"
            />
          </Field>
          <Field>
            <FieldLabel className="ml-1">비밀번호확인</FieldLabel>
            <Input
              value={checkPassword}
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
          <Button
            onClick={() => {
              signUp({
                email,
                password,
              });
            }}
          >
            저장
          </Button>
          <Button variant={"secondary"} onClick={() => {}}>
            취소
          </Button>
        </Field>
      </FieldSet>
    </div>
  );
}
