import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search01Icon } from "hugeicons-react";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Button
      className="h-auto w-full cursor-pointer p-0"
      variant={"ghost"}
      onClick={() => navigate("/search")}
    >
      <InputGroup className="m-0">
        <InputGroupInput
          className="w-full"
          disabled
          placeholder="가이드 찾아보기"
        />
        <InputGroupAddon>
          <Search01Icon />
        </InputGroupAddon>
      </InputGroup>
    </Button>
  );
}
