import defaultAvatar from "@/assets/default-avatar.jpg";
import { Button } from "@/components/ui/button";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { getPositionWithRole } from "@/lib/get-role-or-position";
import type { PositionType, RoleType } from "@/lib/types";
import { useSession } from "@/store/session";
import { useNavigate } from "react-router";

export default function ProfileDetailPage({
  isMyProfile,
}: {
  isMyProfile: boolean;
}) {
  const session = useSession();
  const user = session?.user;
  const { data: profile } = useProfileData(user?.id);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-20">
      <h3 className="border-muted mb-4 border-b py-2 font-bold">
        {`${isMyProfile && "내 "}프로필`}
      </h3>

      <div className="flex flex-col items-center gap-2">
        {/* avatar preview */}
        <div className="bg-muted mb-2 h-20 w-20 overflow-hidden rounded-full">
          <img
            src={
              isMyProfile ? profile?.avatar_url || defaultAvatar : defaultAvatar
            }
            alt="avatar-image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* name & position */}
        <div className="flex gap-1">
          <div className="flex flex-col">
            <span className="font-semibold">{profile?.name}</span>
            {(profile?.name.startsWith("_") || profile?.role === 0) && (
              <span className="text-destructive text-xs">
                정보를 변경해주세요.
              </span>
            )}
          </div>

          <span>
            {isMyProfile
              ? getPositionWithRole(profile?.role as RoleType)
              : ("임시" as PositionType)}
          </span>
        </div>

        {/* email */}
        <div className="flex gap-1">
          <span className="font-semibold">
            {isMyProfile ? user?.email : "abc@example.com"}
          </span>
        </div>
      </div>

      {isMyProfile && (
        <div className="-mt-10 text-center">
          <Button onClick={() => navigate("/profile-update")}>
            프로필 수정
          </Button>
        </div>
      )}
    </div>
  );
}
