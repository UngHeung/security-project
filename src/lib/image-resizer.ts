import imageCompression from "browser-image-compression";
import { toast } from "sonner";

type ResizeFileType = "multi" | "single";

const resizeImageFiles = async (
  type: ResizeFileType,
  size: number,
  files?: File[],
  file?: File,
  previewSize?: number,
) => {
  if (!files && !file) return;
  if (type === "multi" && files && !(files.length > 0)) return;
  if (type === "single" && !files) return;

  const options = {
    maxSizeMb: 1,
    maxWidthOrHeight: size,
  };

  try {
    if (type === "multi") {
      const compressedFiles = await Promise.all(
        files!.map((file) => imageCompression(file, options)),
      );

      return compressedFiles;
    } else {
      const response = await Promise.all([imageCompression(file!, options)]);
      const compressedFile = response[0];

      return compressedFile;
    }
  } catch (error) {
    console.error(error);

    toast.error("문제가 발생했습니다. 관리자에게 문의하세요", {
      position: "top-center",
    });
  }
};

export default resizeImageFiles;
