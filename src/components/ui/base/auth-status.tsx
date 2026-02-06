import defaultAvatar from "@/assets/default-avatar.jpg";
import ProfileButton from "@/components/ui/base/profile-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "@/store/session";
import { useNavigate } from "react-router";

// 임시

export default function AuthStatus() {
  const session = useSession();
  const navigate = useNavigate();
  const isLoggedIn = session?.user;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <ProfileButton size={20} avatarUrl={defaultAvatar} />
        </PopoverTrigger>
        <PopoverContent className="max-w-20">
          <ul className="flex flex-col items-start gap-2">
            {isLoggedIn ? (
              <>
                <li>
                  <Button
                    variant={"ghost"}
                    onClick={() => navigate("/my-profile")}
                  >
                    프로필
                  </Button>
                </li>
                <li>
                  <Button variant={"ghost"} onClick={() => {}}>
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
