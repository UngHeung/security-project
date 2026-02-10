import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TagsIcon } from "hugeicons-react";

// 임시 값
const title = "제목입니다. 긴 제목은 줄이 바뀝니다. 바뀌는지 확인해볼까요?";
const writer = "홍길동";
const position = "파트장";
const images = [
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
  "https://picsum.photos/800/600",
];
const content = `내용입니다.
내용입니다.
내용이에요.`;
const tags = ["반출", "정보자산", "노트북"];
const locations = ["자산", "정보자산"];

export default function GuideDetailPage() {
  return (
    <div>
      {/* header */}
      <header className="flex flex-col items-start gap-2 border-b py-2">
        <h2 className="font-semibold">{title}</h2>
        <div className="flex w-full items-center justify-end gap-1 text-sm">
          <span className="font-semibold">{writer}</span>
          <span>{position}</span>
          <span className="bg-accent h-7 w-7 rounded-full"></span>
        </div>
      </header>

      {/* locations */}
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

      {/* images */}
      <div>
        <Carousel>
          <CarouselContent className="mt-3">
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-8/9">
                <img className="rounded-lg" src={image} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* content */}
      <div className="flex flex-col">
        <p className="border-b border-dashed p-4 text-base whitespace-pre-wrap">
          {content}
        </p>

        {/* tags */}
        <ul className="mt-2 flex items-center justify-end gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant={"secondary"} className="cursor-default">
              {tag}
            </Badge>
          ))}
          <TagsIcon className="text-muted-foreground h-5 w-5" />
        </ul>
      </div>
    </div>
  );
}
