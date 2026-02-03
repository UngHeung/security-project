import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import resizeImageFiles from "@/lib/image-resizer";
import { ImageAdd02Icon } from "hugeicons-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

type GuideEditType = "CREATE" | "UPDATE";

// 임시값
const prevTitle = "제목입니다. 긴 제목은 줄이 바뀝니다. 바뀌는지 확인해볼까요?";
const writer = "홍길동";
const position = "파트장";
const prevImageFiles = [
  {
    file: new File(["dummy image"], "https://picsum.photos/800/600", {
      type: "image/*",
    }),
    imageUrl: "https://picsum.photos/800/600",
  },
  {
    file: new File(["dummy image"], "https://picsum.photos/800/600", {
      type: "image/*",
    }),
    imageUrl: "https://picsum.photos/800/600",
  },
  {
    file: new File(["dummy image"], "https://picsum.photos/800/600", {
      type: "image/*",
    }),
    imageUrl: "https://picsum.photos/800/600",
  },
];
const prevContent = `내용입니다.
내용입니다.
내용이에요.`;
const prevTags = ["반출", "정보자산", "노트북"];
const prevLocations = ["자산", "정보자산"];

export default function GuideEditPage({ type }: { type: GuideEditType }) {
  const [title, setTitle] = useState(type === "UPDATE" ? prevTitle : "");
  const [imageFiles, setImageFiles] = useState<
    { file: File; imageUrl: string }[]
  >(type === "UPDATE" ? prevImageFiles : []);
  const [content, setContent] = useState(type === "UPDATE" ? prevContent : "");
  const [tags, setTags] = useState(
    type === "UPDATE" ? prevTags : ["미선택", "미선택", "미선택"],
  );
  const [locations, setLocations] = useState(
    type === "UPDATE" ? prevLocations : [],
  );

  const handleDeleteImage = (deleteFile: { file: File; imageUrl: string }) => {
    setImageFiles(
      imageFiles.filter((file) => file.imageUrl !== deleteFile.imageUrl),
    );

    URL.revokeObjectURL(deleteFile.imageUrl);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        {/* title */}
        <Label className="m-1" htmlFor="input-title">
          제목
        </Label>
        <Input
          id="input-title"
          placeholder="필수"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        {/* locations */}
        <Label className="m-1" htmlFor="input-locations">
          위치
          <span className="text-muted-foreground -ml-1.5 text-xs">
            (띄어쓰기로 구분합니다. ex - 자산 자산반출)
          </span>
        </Label>
        <Input
          placeholder="선택사항"
          onChange={(event) => {
            if (!event.target.value.trim()) setLocations([]);

            const value = event.target.value;
            setLocations(value.split(/\s+/));
          }}
          value={locations.join(" ")}
        />
        {/* locations preview */}
        <div>
          <ul className="mt-2 flex items-center gap-0.5 px-1 text-sm">
            <li>
              <span className="bg-muted-foreground text-muted mr-1.5 rounded-lg border-0 px-1 py-0.5">
                위치
              </span>
            </li>
            {locations.map((location, index) => {
              if (index < locations.length - 1) {
                return (
                  <li>
                    <span className="bg-muted rounded-lg px-1 py-0.5">
                      {location}
                    </span>
                    <span className="mx-1 text-xs">{">"}</span>
                  </li>
                );
              } else {
                return (
                  <li>
                    <span className="bg-muted rounded-lg px-1 py-0.5">
                      {location}
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>

      {/* tags */}
      <div className="mt-2">
        <Label>
          태그
          <span className="text-muted-foreground -ml-1.5 text-xs">
            (필수 선택)
          </span>
        </Label>
        <SelectGroup className="mb-2 flex justify-between gap-2">
          {/* first tag */}
          <div className="flex w-full flex-col justify-start">
            <Select
              value={tags[0]}
              onValueChange={(value) =>
                setTags((prev) => {
                  const newTags = [value!, prev[1], prev[2]];
                  return newTags;
                })
              }
            >
              <SelectLabel>반출/환입</SelectLabel>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="반출/환입" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"미선택"}>미선택</SelectItem>
                <SelectItem value={"반출"}>반출</SelectItem>
                <SelectItem value={"환입"}>환입</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* second tag */}
          <div className="flex w-full flex-col justify-start">
            <Select
              value={tags[1]}
              onValueChange={(value) =>
                setTags((prev) => {
                  const newTags = [prev[0], value!, prev[2]];
                  return newTags;
                })
              }
            >
              <SelectLabel>카테고리</SelectLabel>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="반출/환입" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"미선택"}>미선택</SelectItem>
                <SelectItem value={"정보자산"}>정보자산</SelectItem>
                <SelectItem value={"미등록정보자산"}>미등록정보자산</SelectItem>
                <SelectItem value={"고정일반자산"}>고정일반</SelectItem>
                <SelectItem value={"고정일반자산(수시)"}>
                  고정일반자산(수시)
                </SelectItem>
                <SelectItem value={"문서"}>문서</SelectItem>
                <SelectItem value={"오반입물품"}>오반입물품</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* third tag */}
          <div className="flex w-full flex-col justify-start">
            <Select
              value={tags[2]}
              onValueChange={(value) =>
                setTags((prev) => {
                  const newTags = [prev[0], prev[1], value!];
                  return newTags;
                })
              }
            >
              <SelectLabel>자산종류</SelectLabel>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="반출/환입" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"미선택"}>미선택</SelectItem>
                <SelectItem value={"노트북"}>노트북</SelectItem>
                <SelectItem value={"휴대폰"}>휴대폰</SelectItem>
                <SelectItem value={"랩탑"}>랩탑</SelectItem>
                <SelectItem value={"저장소"}>저장소</SelectItem>
                <SelectItem value={"보드"}>보드</SelectItem>
                <SelectItem value={"녹음/녹화장치"}>녹음/녹화장치</SelectItem>
                <SelectItem value={"포터블모니터"}>포터블모니터</SelectItem>
                <SelectItem value={"기타"}>기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SelectGroup>
      </div>

      {/* content */}
      <div>
        <Label className="m-1" htmlFor="input-content">
          내용
        </Label>
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          id="input-content"
          className="max-h-100 min-h-40 resize-none"
          placeholder="필수"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label
          htmlFor="input-file"
          className="text-muted-foreground bg-muted flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border p-1 hover:brightness-90"
        >
          <ImageAdd02Icon size={20} />
        </Label>
        <Input
          id="input-file"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files) return;

            const files = Array.from(event.target.files);
            const resizedFiles = (await resizeImageFiles(
              "multi",
              1024,
              files,
            )) as File[];

            resizedFiles!.map((file) =>
              setImageFiles((prevImageUrls) => [
                ...prevImageUrls,
                {
                  file,
                  imageUrl: URL.createObjectURL(file),
                },
              ]),
            );

            event.target.value = "";
          }}
        />

        <Button
          onClick={() => {
            const message = `data : ${title}
${writer}
${position}
${content}
${locations}
${tags}
${imageFiles}`;
            toast.message(message, {
              position: "top-center",
            });
          }}
          className="cursor-pointer"
        >
          저장
        </Button>
      </div>

      {imageFiles.length > 0 && (
        <div>
          <Carousel>
            <CarouselContent>
              {imageFiles.map((file, index) => (
                <CarouselItem
                  key={index}
                  className="basis-3/4"
                  onClick={() => handleDeleteImage(file)}
                >
                  <div className="relative cursor-pointer overflow-hidden rounded-sm">
                    <img
                      className="h-full w-full object-cover"
                      src={file.imageUrl}
                      alt={`preview-${file}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
}
