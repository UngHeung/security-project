import defaultAvatar from "@/assets/default-avatar.jpg";
import { useSession } from "@/store/session";

// 임시
const tempUser = {
  name: "홍길동",
  postion: "파트장",
  email: "abce@example.com",
  avatar_url: defaultAvatar,
};

export default function ProfileDetailPage({
  isMyProfile,
}: {
  isMyProfile: boolean;
}) {
  const session = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col gap-20">
      <h3 className="border-muted mb-4 border-b py-2 font-bold">
        {`${isMyProfile && "내 "}프로필`}
      </h3>

      <div className="flex flex-col items-center gap-2">
        {/* avatar preview */}
        <div className="bg-muted mb-2 h-20 w-20 overflow-hidden rounded-full">
          <img
            src={tempUser.avatar_url}
            alt="avatar-image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* name & position */}
        <div className="flex gap-1">
          <span className="font-semibold">{tempUser.name}</span>

          <span>{tempUser.postion}</span>
        </div>

        {/* email */}
        <div className="flex gap-1">
          <span className="font-semibold">{tempUser.email}</span>
        </div>
      </div>
    </div>
  );
}
