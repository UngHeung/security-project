import { signOut } from "@/api/auth";
import defaultAvatar from "@/assets/default-avatar.jpg";
import ProfileImage from "@/components/ui/base/profile-image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import { useNavigate } from "react-router";

export default function ProfileButton() {
  const session = useSession();
  const navigate = useNavigate();
  const user = session?.user;

  const { data: profile, isPending: isFetchingProfilePending } = useProfileData(
    user?.id,
  );

  return (
    <>
      <Popover>
        <PopoverTrigger disabled={user && isFetchingProfilePending}>
          <ProfileImage avatarUrl={profile?.avatar_url || defaultAvatar} />
        </PopoverTrigger>
        <PopoverContent className="max-w-20">
          <ul className="flex flex-col items-start gap-2">
            {user ? (
              <>
                <li>
                  <Button
                    variant={"ghost"}
                    disabled={isFetchingProfilePending}
                    onClick={() => navigate("/my-profile")}
                  >
                    프로필
                  </Button>
                </li>
                <li>
                  <Button variant={"ghost"} onClick={signOut}>
                    로그아웃
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button
                    variant={"ghost"}
                    onClick={() => navigate("/sign-in")}
                  >
                    로그인
                  </Button>
                </li>
                <li>
                  <Button
                    variant={"ghost"}
                    onClick={() => navigate("/sign-up")}
                  >
                    회원가입
                  </Button>
                </li>
              </>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
}
