import { delayTPS } from "@/utils/time";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TImages } from "./ImageMain";
import { apiImageCompress } from "./api";

const useImageUpload = () => {
  const [images, setImages] = useState<{ [key: string]: TImages }>({});
  const isUploading = useRef(false);
  const uploadImageTimeout = useRef<NodeJS.Timeout | null>(null);

  const updateImage = (id: string, update: Partial<TImages>) => {
    setImages((prevImages) => ({
      ...prevImages,
      [id]: { ...prevImages[id], ...update },
    }));
  };

  const uploadImages = useCallback(async () => {
    if (isUploading.current) return; // Prevent multiple uploads
    isUploading.current = true;

    try {
      const itemUploads = Object.values(images).filter(
        (m) => m.status === "upload"
      );

      if (itemUploads.length > 0) {
        for (const item of itemUploads) {
          try {
            updateImage(item.id, { status: "running" });
            console.log("start", item.file?.name, item.status);
            // TODO: add check size bigger with api job -> max 60s will got timeout
            // image size >= 10MB ?
            const res = await apiImageCompress({ file: item.file as File });
            updateImage(item.id, { status: "done", output: res?.data?.data });
          } catch (error: any) {
            console.error("Upload error:", error);
            // TODO: Improved error logging
            updateImage(item.id, {
              status: "error",
              error: error?.response?.data,
            });
          }
          await delayTPS(10);
        }
      }
    } finally {
      isUploading.current = false;
    }
  }, [images]);

  useEffect(() => {
    const debounceUploadImages = () => {
      if (uploadImageTimeout.current) {
        clearTimeout(uploadImageTimeout.current);
      }
      uploadImageTimeout.current = setTimeout(() => {
        uploadImages().then().catch();
      }, 1); // Debounce delay
    };

    debounceUploadImages();

    return () => {
      if (uploadImageTimeout.current) {
        clearTimeout(uploadImageTimeout.current);
      }
    };
  }, [images, uploadImages]);

  const stats = useMemo(() => {
    const arr = Object.values(images);
    const total = arr.length || 0;
    const totalSuccess = arr.filter((m) => m.status === "done").length || 0;
    const totalError = arr.filter((m) => m.status === "error").length || 0;

    return {
      total,
      totalSuccess,
      totalError,
    };
  }, [images]);

  return {
    images,
    addImages: (newImages: TImages[]) => {
      setImages((prevImages) => {
        const updatedImages = { ...prevImages };
        newImages.forEach((image) => {
          updatedImages[image.id] = image;
        });
        return updatedImages;
      });
    },
    updateImage,
    deleteImage: (id: string) => {
      const obj = { ...images };
      delete obj[id];
      setImages(obj);
    },
    deleteAllImage: () => {
      setImages({});
    },
    ...stats,
  };
};

export default useImageUpload;
