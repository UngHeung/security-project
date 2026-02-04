import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import resizeImageFiles from "@/lib/image-resizer";
import { useState, type ChangeEvent } from "react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { toast } from "sonner";

type PositionType = "파트장" | "팀장" | "책임" | "선임" | "주임" | "사원";

type AvatarType = {
  file: File;
  avatarUrl: string;
};

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<AvatarType | undefined>(undefined);
  const [position, setPosition] = useState<PositionType>("사원");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <div className="flex flex-col gap-20">
      {/* avatar & preview */}
      <div className="flex flex-col items-center gap-2">
        <div>
          <Label
            htmlFor="avatar_image"
            className="bg-muted mb-2 h-20 w-20 cursor-pointer overflow-hidden rounded-full"
          >
            <img
              src={avatar ? avatar.avatarUrl : defaultAvatar}
              alt="avatar-image"
              className="h-full w-full object-cover"
            />
          </Label>

          <Input
            id="avatar_image"
            type="file"
            accept="imgage/*"
            hidden
            onChange={async (event: ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) return;
              console.log(event.target.files);

              const file = Array.from(event.target.files)[0];
              const resizedFile = (await resizeImageFiles(
                "single",
                200,
                [],
                file,
              )) as File;

              setAvatar({
                file: resizedFile,
                avatarUrl: URL.createObjectURL(resizedFile),
              });

              event.target.value = "";
            }}
          />
        </div>
        <div className="flex gap-1">
          {name.length > 0 ? (
            <span className="font-semibold">{name}</span>
          ) : (
            <span className="text-muted font-semibold">{"홍길동"}</span>
          )}
          <span>{position}</span>
        </div>
        <div className="flex gap-1">
          {email.length > 0 ? (
            <span>{email}</span>
          ) : (
            <span className="text-muted font-semibold">
              {"abcd@example.com"}
            </span>
          )}
        </div>
      </div>

      {/* input field */}
      <FieldSet className="flex flex-col gap-2">
        <div className="flex gap-2">
          {/* name */}
          <Field className="basis-4/6">
            <FieldLabel className="ml-1">이름</FieldLabel>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="홍길동"
            />
            <FieldDescription className="ml-1">
              실명을 입력해주세요.
            </FieldDescription>
          </Field>

          {/* position */}
          <Field className="basis-2/6">
            <FieldLabel className="ml-1">직책</FieldLabel>
            <Select
              defaultValue={position}
              onValueChange={(value) => setPosition(value as PositionType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"사원"}>사원</SelectItem>
                  <SelectItem value={"주임"}>주임</SelectItem>
                  <SelectItem value={"선임"}>선임</SelectItem>
                  <SelectItem value={"책임"}>책임</SelectItem>
                  <SelectItem value={"팀장"}>팀장</SelectItem>
                  <SelectItem value={"파트장"}>파트장</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription className="ml-1"></FieldDescription>
          </Field>
        </div>

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
              const message = `${name}
${position}
${email}
${avatar?.avatarUrl}`;
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
