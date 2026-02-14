import FallBack from "@/components/fallback";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useInfiniteGuideData } from "@/hooks/queries/use-infinity-guides";
import { useSession } from "@/store/session";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";
import GuideItem from "./guide-item";
import { QuillWrite01Icon } from "hugeicons-react";

export default function GuideList() {
  const session = useSession();
  const userId = session?.user.id;
  const navigate = useNavigate();

  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfiniteGuideData();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <FallBack />;
  if (isPending) return <Loader />;

  return (
    <div className="relative mt-4 flex flex-col gap-2">
      <Button
        variant={"default"}
        className="fixed right-5 bottom-5 h-15 w-15 rounded-full shadow"
        onClick={() => navigate("/guide/write")}
      >
        <QuillWrite01Icon className="size-7" />
      </Button>
      {data.pages.length < 0 ? (
        <div className="flex justify-center">
          <span className="mt-4 text-sm">
            작성된 가이드가 없습니다.{" "}
            <Button
              variant={"ghost"}
              className="text-primary text-sm"
              onClick={() => navigate("/guide/write")}
            >
              첫번째 가이드
            </Button>
            를 작성해주세요.
          </span>
        </div>
      ) : (
        data.pages.map((page) => {
          return page.map((guideId, index) => {
            return <GuideItem key={index} userId={userId} guideId={guideId} />;
          });
        })
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
