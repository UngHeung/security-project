import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
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
          />
        </Field>

        <Field>
          <FieldLabel className="ml-1">비밀번호</FieldLabel>
          <Input
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            type="password"
          />
        </Field>

        {/* buttons */}
        <Field className="mt-4">
          <Button
            onClick={() => {
              const message = `${email}`;
              toast.message(message, { position: "top-center" });
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
