import imageCompression from "browser-image-compression";
import { toast } from "sonner";

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

export default resizeImageFiles;
