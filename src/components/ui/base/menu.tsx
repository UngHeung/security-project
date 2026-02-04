import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router";

export default function Menu() {
  const navigate = useNavigate();
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Button variant="ghost" onClick={() => navigate("/")}>
                메인
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink>
              <Button variant="ghost" onClick={() => navigate("/search")}>
                검색
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>게시판</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col">
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/guide/write")}
                  >
                    가이드작성
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/guide/update")}
                  >
                    가이드수정
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" onClick={() => navigate("/guide/1")}>
                    가이드샘플
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/board/notice")}
                  >
                    공지사항
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
