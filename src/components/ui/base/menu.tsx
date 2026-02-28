import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Menu() {
  const navigate = useNavigate();

  const [value, setValue] = useState<string | null>(null);

  const handleNavigate = (link: string) => {
    navigate(link);
    setValue(null);
  };

  return (
    <div>
      <NavigationMenu
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
      >
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Button variant="ghost" onClick={() => handleNavigate("/search")}>
                검색
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>게시판</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col">
                <li key={1}>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigate("/guide")}
                  >
                    가이드
                  </Button>
                </li>
                <li key={2}>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigate("/board/notice")}
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
