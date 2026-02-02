import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from "browser-image-compression";
import { ImageAdd02Icon } from "hugeicons-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

type GuideEditType = "CREATE" | "UPDATE";

// 임시값
const prevTitle = "제목입니다. 긴 제목은 줄이 바뀝니다. 바뀌는지 확인해볼까요?";
const writer = "홍길동";
const prevPosition = "파트장";
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

// resizer
const resizeImageFiles = async (
  files: File[],
  size: number,
  previewSize?: number,
) => {
  if (!files.length) return;

  const options = {
    maxSizeMb: 1,
    maxWidthOrHeight: size,
  };

  try {
    const compressedFiles = await Promise.all(
      files.map((file) => imageCompression(file, options)),
    );

    return compressedFiles;
  } catch (error) {
    console.error(error);

    toast.error("문제가 발생했습니다. 관리자에게 문의하세요", {
      position: "top-center",
    });
  }
};

export default function GuideEditPage({ type }: { type: GuideEditType }) {
  const [title, setTitle] = useState(type === "UPDATE" ? prevTitle : "");
  const [position, setPosition] = useState(
    type === "UPDATE" ? prevPosition : [],
  );
  const [imageFiles, setImageFiles] = useState<
    { file: File; imageUrl: string }[]
  >(type === "UPDATE" ? prevImageFiles : []);
  const [content, setContent] = useState(type === "UPDATE" ? prevContent : "");
  const [tags, setTags] = useState(type === "UPDATE" ? prevTags : []);
  const [locations, setLocations] = useState(
    type === "UPDATE" ? prevLocations : [],
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="m-1" htmlFor="input-title">
          제목
          <span className="text-muted-foreground -ml-1.5 text-xs">(필수)</span>
        </Label>
        <Input id="input-title" placeholder="제목*" />
      </div>
      <div>
        <Label className="m-1" htmlFor="input-content">
          내용
          <span className="text-muted-foreground -ml-1.5 text-xs">(필수)</span>
        </Label>
        <Textarea
          id="input-content"
          className="max-h-100 min-h-40 resize-none"
          placeholder="내용*"
        />
      </div>

      <div>
        <Label
          htmlFor="input-file"
          className="text-muted-foreground hover:text-muted bg-muted hover:bg-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border p-1"
        >
          <ImageAdd02Icon size={20} />
        </Label>
        <Input
          id="input-file"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files) return;

            const files = Array.from(event.target.files);
            const resizedFiles = await resizeImageFiles(files, 1024);

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
      </div>

      {imageFiles.length && (
        <div>
          <Carousel>
            <CarouselContent>
              {imageFiles.map((file) => (
                <CarouselItem className="basis-3/4">
                  <div className="relative h-25 cursor-pointer overflow-hidden rounded-sm">
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
