import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateGuide } from "@/hooks/mutations/guide/use-create-guide";
import { useUpdateGuide } from "@/hooks/mutations/guide/use-update-guide";
import { generateErrorMessage } from "@/lib/error";
import resizeImageFiles from "@/lib/image-resizer";
import { useGuideEditor } from "@/store/guide-edit";
import { useSession } from "@/store/session";
import { Cancel02Icon, ImageAdd02Icon } from "hugeicons-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

type Image = {
  file: File;
  filePath: string;
};

export default function GuideEditPage() {
  const params = useParams<{ id: string }>();
  const session = useSession();
  const user = session?.user;
  const navigate = useNavigate();
  const guideEditorStore = useGuideEditor();

  const editType = params.id ? "update" : "create";

  const {
    mutate: createGuide,
    data: createGuideData,
    isPending: isCreateGuidePending,
  } = useCreateGuide({
    onSuccess: () => {
      toast.message("가이드 작성 성공", { position: "top-center" });
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
    },
  });

  const {
    mutate: updateGuide,
    data: updateGuideData,
    isPending: isUpdateGuidePending,
  } = useUpdateGuide({
    onSuccess: () => {
      toast.message("가이드 업데이트 성공", { position: "top-center" });
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
    },
  });

  const [title, setTitle] = useState(
    editType === "create" ? "" : guideEditorStore.title,
  );
  const [content, setContent] = useState(
    editType === "create" ? "" : guideEditorStore.content,
  );

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(
    editType === "create" ? [] : guideEditorStore.tags?.split(" ") || [],
  );

  const [locations, setLocations] = useState<string[]>(
    editType === "create" ? [] : guideEditorStore.locations?.split(" ") || [],
  );
  const [images, setImages] = useState<Image[]>(
    editType === "create" ? [] : [],
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const locationsRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const handleEditGuide = async () => {
    if (!user) return;

    if (!title.trim().length) {
      toast.error("제목을 입력하세요.", { position: "top-center" });
      titleRef.current?.focus();
      return;
    }

    if (!content.trim().length) {
      toast.error("내용을 입력하세요.", { position: "top-center" });
      contentRef.current?.focus();
      return;
    }

    if (tags.filter((tag) => tag.match("미선택")).length > 0) {
      toast.error("태그를 선택해주세요.", { position: "top-center" });
      return;
    }

    const contents = {
      writer_id: user.id,
      title,
      content,
      locations: locations.join(" ").trim(),
      tags: tags.join(" ").trim(),
    };

    if (editType === "create") {
      createGuide({
        contents,
        imageFiles: [...images.map((image) => image.file)],
      });
    } else if (editType === "update") {
      updateGuide({ ...contents, id: Number(params.id) });
    }
  };

  const handleSelectImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const resizedFiles = (await resizeImageFiles(
      "multi",
      1024,
      files,
    )) as File[];

    resizedFiles!.map((file) =>
      setImages((prevImageUrls) => [
        ...prevImageUrls,
        { file, filePath: URL.createObjectURL(file) },
      ]),
    );

    event.target.value = "";
  };

  const handleDeleteImage = ({ deleteFile }: { deleteFile: Image }) => {
    if (!deleteFile) return;

    setImages(images.filter((image) => image.filePath !== deleteFile.filePath));
    URL.revokeObjectURL(deleteFile.filePath);
  };

  const handleAddTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (editType === "create" && createGuideData?.id) {
      navigate(`/guide/${createGuideData?.id}`);
    } else if (editType === "update" && updateGuideData?.id) {
      navigate(`/guide/${updateGuideData.id}`);
    }
  }, [editType, createGuideData?.id, updateGuideData?.id, navigate]);

  useEffect(() => {
    return () => {
      if (images.length > 0) {
        images.map((image) => URL.revokeObjectURL(image.filePath));
      }
    };
  }, []);

  const isPending = isCreateGuidePending || isUpdateGuidePending;

  return (
    <div className="flex flex-col gap-2">
      <div>
        {/* title */}
        <Label className="m-1" htmlFor="input-title">
          제목
        </Label>
        <Input
          disabled={isPending}
          ref={titleRef}
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
          disabled={isPending}
          ref={locationsRef}
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
            <li key={"none"}>
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
        </div>
      </div>

      {/* tags */}
      <div className="mt-2">
        <Label>
          태그
          <span className="text-muted-foreground -ml-1.5 text-xs">(필수)</span>
        </Label>
        <div className="flex items-center gap-2">
          <Input
            ref={tagRef}
            disabled={isPending}
            placeholder="필수"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
          <Button
            disabled={tag.trim().length === 0 || isPending}
            variant={"default"}
            onClick={() => {
              if (tags.find((t) => t === tag.trim())) {
                toast.error("이미 추가된 태그입니다.", {
                  position: "top-center",
                });

                setTag("");
                tagRef.current?.focus();
                return;
              }

              setTags((prevTag) => [...prevTag, tag.trim()]);
              setTag("");
              tagRef.current?.focus();
            }}
          >
            추가
          </Button>
        </div>
        <div>
          <ul className="mt-0.5 flex gap-1">
            {tags.map((tag, index) => (
              <li key={index} className="mt-0.5 inline-block">
                <Badge
                  className="relative h-6 cursor-default rounded-md"
                  variant={"outline"}
                  onClick={() => handleDeleteTag(index)}
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* content */}
      <div>
        <Label className="m-1" htmlFor="input-content">
          내용
        </Label>
        <Textarea
          disabled={isPending}
          ref={contentRef}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          id="input-content"
          className="max-h-100 min-h-40 resize-none"
          placeholder="필수"
        />
      </div>

      <div
        className={`flex items-center ${editType === "create" ? "justify-between" : "justify-end"}`}
      >
        {editType === "create" && (
          <>
            <Label
              htmlFor="input-file"
              className="text-muted-foreground bg-muted flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border p-1 hover:brightness-90"
            >
              <ImageAdd02Icon size={20} />
            </Label>
            <Input
              disabled={isPending}
              id="input-file"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(event) => handleSelectImage(event)}
            />
          </>
        )}

        <div className="flex gap-2">
          <Button disabled={isPending} onClick={handleEditGuide}>
            저장
          </Button>
          <Button
            variant={"secondary"}
            disabled={isPending}
            onClick={() => navigate(-1)}
          >
            취소
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div>
          {images.length > 0 && (
            <Carousel>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index} className="basis-4/7">
                    <div className="relative h-60 w-auto cursor-pointer overflow-hidden rounded-sm">
                      <Cancel02Icon
                        onClick={() => {
                          if (isPending) return;
                          handleDeleteImage({ deleteFile: image });
                        }}
                        className="absolute top-2 right-3 h-5 w-5 rounded-full bg-[oklch(0_0_0/0.10)] text-white"
                      />
                      <img
                        className="h-full w-full object-cover"
                        src={image.filePath}
                        alt={`preview-${image}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      )}
    </div>
  );
}
