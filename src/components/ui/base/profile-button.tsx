import defaultAvatar from "@/assets/default-avatar.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import { Button } from "../button";

export default function ProfileButton({
  size,
  avatarUrl,
  type,
}: {
  size: number;
  avatarUrl?: string;
  type?: "primary" | "secondary";
}) {
  const isLogedIn = false;

  return (
    <>
      {type === "primary" ? (
        <Popover>
          <PopoverTrigger>
            {isLogedIn ? (
              <div className="bg-muted flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full">
                <img
                  src={avatarUrl || defaultAvatar}
                  alt="My avatar"
                  width={size}
                  height={size}
                  className="rounded-full"
                />
              </div>
            ) : (
              <span>로그인</span>
            )}
          </PopoverTrigger>
          <PopoverContent className="mr-1 w-40 p-2">
            {isLogedIn ? (
              <ul className="flex flex-col gap-2">
                {/* 로그인 사용자 */}
                <li className="hover:bg-muted rounded-sm">
                  <Button
                    variant="ghost"
                    className="w-full cursor-pointer justify-start"
                  >
                    <Link className="text-sm" to={"/profile"}>
                      프로필
                    </Link>
                  </Button>
                </li>
                <li className="hover:bg-muted rounded-sm">
                  <Button
                    variant="ghost"
                    className="w-full cursor-pointer justify-start"
                  >
                    <Link to={"/logout"}>로그아웃</Link>
                  </Button>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-2">
                {/* 비로그인 사용자 */}
                <li className="hover:bg-muted rounded-sm">
                  <Button
                    variant="ghost"
                    className="w-full cursor-pointer justify-start"
                  >
                    <Link to={"/sign-in"}>로그인</Link>
                  </Button>
                </li>
                <li className="hover:bg-muted rounded-sm">
                  <Button
                    variant="ghost"
                    className="w-full cursor-pointer justify-start"
                  >
                    <Link to={"/sign-up"}>회원가입</Link>
                  </Button>
                </li>
              </ul>
            )}
          </PopoverContent>
        </Popover>
      ) : (
        <Link to={"#"}>
          <div className="bg-muted flex h-6 w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full">
            <img
              src={avatarUrl || defaultAvatar}
              alt="My avatar"
              width={size}
              height={size}
              className="rounded-full"
            />
          </div>
        </Link>
      )}
    </>
  );
}
