import defaultAvatar from "@/assets/default-avatar.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGuideData } from "@/hooks/queries/use-guide-data";
import { getPositionWithRole } from "@/lib/get-role-or-position";
import type { RoleType } from "@/lib/types";
import { TagsIcon } from "hugeicons-react";
import { useNavigate } from "react-router";

export default function GuideItem({
  userId,
  guideId,
}: {
  userId?: string;
  guideId: number;
}) {
  const navigate = useNavigate();

  const { data, isPending, error } = useGuideData({
    type: "list",
    guideId,
  });

  return (
    <div className="flex flex-col border-b">
      <header className="border-muted mb-2 flex justify-between border-b pb-2">
        <span>{data?.title}</span>
        <div className="flex items-center gap-1">
          <div>
            <span className="mr-0.5 text-sm font-semibold">
              {data?.writer.name}
            </span>
            <span className="text-sm">
              {getPositionWithRole(data?.writer.role as RoleType)}
            </span>
          </div>
          <span>
            <img
              className="h-5 w-5"
              src={data?.writer.avatar_url || defaultAvatar}
              alt="writer-profile"
            />
          </span>
        </div>
      </header>
      <p className="text-sm">{data?.content}</p>
      <div className="flex justify-end">
        <Button
          className="text-muted-foreground"
          variant={"link"}
          onClick={() => navigate(`/guide/${guideId}`)}
        >
          자세히보기
        </Button>
      </div>
      <div className="my-2 flex items-center justify-start gap-1">
        {data?.tags.split(" ").map((tag, index) => {
          return (
            <Badge key={index} variant={"secondary"} className="cursor-default">
              {tag}
            </Badge>
          );
        })}
        <TagsIcon className="text-muted-foreground h-4 w-4" />
      </div>
    </div>
  );
}
