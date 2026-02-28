import defaultAvatar from "@/assets/default-avatar.jpg";
import FallBack from "@/components/fallback";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useDeleteGuide } from "@/hooks/mutations/guide/use-delete-guide";
import { useGuideData } from "@/hooks/queries/use-guide-data";
import { getPositionWithRole } from "@/lib/get-role-or-position";
import type { RoleType } from "@/lib/types";
import {
  useResetGuideEditor,
  useSetGuideEditor,
  type EditGuideType,
} from "@/store/guide-edit";
import { useSession } from "@/store/session";
import { TagsIcon } from "hugeicons-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function GuideDetailPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const session = useSession();
  const user = session?.user;

  const setGuideEditor = useSetGuideEditor();
  const resetGuideEditor = useResetGuideEditor();

  const {
    mutate: deleteGuide,
    isPending: isDeleteGuidePending,
    error: deleteGuideError,
  } = useDeleteGuide({
    onSuccess: () => {
      toast.success("가이드가 성공적으로 삭제되었습니다.", {
        position: "top-center",
      });
      navigate("/guide");
    },
  });

  const {
    data: guide,
    isPending: isGuidePending,
    error: guideError,
  } = useGuideData({
    guideId: Number(params.id),
    type: "detail",
  });

  const locations = guide?.locations?.length
    ? guide?.locations?.split(" ")
    : [];
  const tags = guide?.tags.split(" ") || [];
  const imageUrls = guide?.image_urls?.split(" ") || [];

  const handleDeleteGuide = () => {
    try {
      deleteGuide({ userId: user!.id, guideId: Number(params.id) });
      navigate("/guide");
    } catch (error) {
      toast.error("가이드 삭제에 실패했습니다. 다시 시도해주세요.", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (!guide) return;
    setGuideEditor(guide as EditGuideType);
  }, [guide, setGuideEditor]);

  useEffect(() => {
    return () => resetGuideEditor();
  }, [resetGuideEditor]);

  if (isGuidePending) return <Loader />;
  if (guideError) return <FallBack />;

  return (
    <div>
      {/* header */}
      <header className="flex flex-col items-start gap-2 border-b py-2">
        <h2 className="font-semibold">{guide.title}</h2>
        <div className="flex w-full items-center justify-end gap-1 text-sm">
          <span className="font-semibold">{guide.writer.name}</span>
          <span>{getPositionWithRole(guide.writer.role as RoleType)}</span>
          <span className="bg-accent h-7 w-7 rounded-full">
            <img
              src={guide.writer?.avatar_url || defaultAvatar}
              alt={"writer-avater"}
            />
          </span>
        </div>
      </header>

      {/* locations */}
      {locations.length > 0 && (
        <ul className="mt-2 flex items-center gap-0.5 px-1 text-sm">
          <li>
            <span className="bg-muted-foreground text-muted mr-1.5 rounded-lg border-0 px-1 py-0.5">
              위치
            </span>
          </li>
          {locations.map((location, index) => {
            if (index < locations.length - 1) {
              return (
                <li key={index}>
                  <span className="bg-muted rounded-lg px-1 py-0.5">
                    {location}
                  </span>
                  <span className="mx-1 text-xs">{">"}</span>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <span className="bg-muted rounded-lg px-1 py-0.5">
                    {location}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      )}

      {/* images */}
      <div>
        {imageUrls.length > 0 && (
          <Carousel>
            <CarouselContent className="mt-3">
              {imageUrls.map((image, index) => (
                <CarouselItem
                  key={index}
                  className={imageUrls.length === 1 ? "basis-1/1" : "basis-8/9"}
                >
                  <img className="rounded-lg" src={image} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      {/* content */}
      <div className="flex flex-col">
        <p className="border-b border-dashed p-4 text-base whitespace-pre-wrap">
          {guide.content}
        </p>

        {/* reference link */}
        {guide.reference_ids && guide.reference_ids.trim().length > 0 && (
          <div className="border-b px-4 py-1 text-sm">
            <ul className="text-muted-foreground flex flex-col gap-0.5">
              {guide.reference_ids.split(" ").map((id, index) => (
                <li
                  className="hover:text-accent-foreground hover:underline"
                  key={index}
                >
                  <Link
                    className="cursor-default"
                    to={`/guide/${id}`}
                  >{`참고 가이드 ${index + 1}`}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* tags */}
        <ul className="mt-2 flex items-center justify-start gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant={"secondary"} className="cursor-default">
              {tag}
            </Badge>
          ))}
          <TagsIcon className="text-muted-foreground h-5 w-5" />
        </ul>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="flex gap-2">
          {user && guide.writer.id === user.id && (
            <>
              <Button
                disabled={isDeleteGuidePending}
                onClick={() => {
                  navigate(`/guide/update/${guide.id}`);
                }}
              >
                수정하기
              </Button>
              <Button
                disabled={isDeleteGuidePending}
                variant={"destructive"}
                onClick={handleDeleteGuide}
              >
                삭제
              </Button>
            </>
          )}
          <Button
            disabled={isDeleteGuidePending}
            variant={"secondary"}
            onClick={() => {
              navigate(`/guide`);
            }}
          >
            목록
          </Button>
        </div>
      </div>
    </div>
  );
}
