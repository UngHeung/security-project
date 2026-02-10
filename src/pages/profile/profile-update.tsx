import defaultAvatar from "@/assets/default-avatar.jpg";
import { GlobalLoader } from "@/components/global-loader";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import { useUpdateProfile } from "@/hooks/mutations/use-update-profile";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { generateErrorMessage } from "@/lib/error";
import {
  getPositionWithRole,
  getRoleWithPosition,
} from "@/lib/get-role-or-position";
import resizeImageFiles from "@/lib/image-resizer";
import type { PositionType, RoleType } from "@/lib/types";
import { useSession } from "@/store/session";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type AvatarType = {
  file: File;
  avatarUrl: string;
};

export default function ProfileUpdate() {
  const session = useSession();
  const user = session?.user;
  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    user?.id,
  );
  const navigate = useNavigate();

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onError: (error) => {
        const message = generateErrorMessage(error);

        toast.error(message, { position: "top-center" });
      },
      onSuccess: () => {
        toast.message("프로필 저장 성공", { position: "top-center" });
        navigate("/my-profile");
      },
    });

  const [name, setName] = useState(profile?.name);
  const [avatar, setAvatar] = useState<AvatarType | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState(
    profile?.avatar_url || defaultAvatar,
  );
  const [role, setRole] = useState<RoleType>(Number(profile?.role) as RoleType);
  const [position, setPosition] = useState<PositionType>(
    getPositionWithRole(Number(profile?.role) as RoleType),
  );

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = Array.from(event.target.files)[0];
    const fileSize = file.size;
    const fileExtension = file.name.split(".")[1];
    const resizedFile =
      fileSize <= 500 * 1000 && // 500kb
      (fileExtension === "gif" || fileExtension === "webp")
        ? file
        : ((await resizeImageFiles("single", 200, [], file)) as File);

    const previewAvatarUrl = URL.createObjectURL(resizedFile);

    setAvatar({
      file: resizedFile,
      avatarUrl: previewAvatarUrl,
    });

    setAvatarUrl(previewAvatarUrl);

    event.target.value = "";
  };

  const handleSelectPosition = (value: PositionType) => {
    if (value === "임시") {
      toast.error("임시 직책을 선택할 수 없습니다.", {
        position: "top-center",
      });
      setPosition("사원");
    } else {
      setPosition(value as PositionType);
    }
  };

  const handleUpdateProfile = () => {
    if (!user) return;

    if (position === "임시") {
      toast.error("임시 직책을 선택할 수 없습니다.", {
        position: "top-center",
      });
      setPosition("사원");
      return;
    }

    updateProfile({
      userId: user.id,
      role: role as RoleType,
      name: name!,
      avatarImageFile: avatar?.file,
    });
  };

  if (isProfileLoading) return <GlobalLoader />;

  return (
    <div className="flex flex-col gap-20">
      {/* avatar & preview */}
      <div className="flex flex-col items-center gap-2">
        <div>
          <Label
            htmlFor="avatar_image"
            className="bg-muted mb-2 h-20 w-20 overflow-hidden rounded-full"
          >
            <img
              src={avatarUrl}
              alt="avatar-image"
              className="h-full w-full object-cover"
            />
          </Label>

          <Input
            id="avatar_image"
            type="file"
            accept="imgage/*"
            hidden
            onChange={handleChangeAvatar}
          />
        </div>
        <div className="flex justify-center gap-1">
          <span className="font-semibold">{name || profile?.name}</span>
          <span>{position}</span>
        </div>
        <div className="flex gap-1">
          <span>{user?.email}</span>
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
              value={
                position ||
                getPositionWithRole(Number(profile?.role) as RoleType)
              }
              onValueChange={(value) => {
                handleSelectPosition(value as PositionType);
                setRole(getRoleWithPosition(value as PositionType));
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"임시"}>임시</SelectItem>
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

        {/* buttons */}
        <Field className="mt-4">
          <Button onClick={handleUpdateProfile}>저장</Button>
          <Button variant={"secondary"} onClick={() => navigate(-1)}>
            취소
          </Button>
        </Field>
      </FieldSet>
    </div>
  );
}
