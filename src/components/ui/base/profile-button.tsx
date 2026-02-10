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
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ProfileButton() {
  const session = useSession();
  const navigate = useNavigate();
  const user = session?.user;

  const [isMenuOpen, setIsOpen] = useState(false);

  const { data: profile, isPending: isFetchingProfilePending } = useProfileData(
    user?.id,
  );

  return (
    <>
      <Popover open={isMenuOpen} onOpenChange={setIsOpen}>
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
                    onClick={() => {
                      navigate("/my-profile");
                      setIsOpen(false);
                    }}
                  >
                    프로필
                  </Button>
                </li>
                <li>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    로그아웃
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      navigate("/sign-in");
                      setIsOpen(false);
                    }}
                  >
                    로그인
                  </Button>
                </li>
                <li>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      navigate("/sign-up");
                      setIsOpen(false);
                    }}
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
