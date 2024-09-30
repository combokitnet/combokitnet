export interface FileNameType {
  name: string;
  key: string;
  desc: string;
  example: string;
}

export const conflictResolution = {
  lowercase: ["uppercase"],
  uppercase: ["lowercase"],
  slug: ["remove_special_characters"],
  remove_special_characters: ["slug"],
};

export const fileNameTypes: FileNameType[] = [
  {
    name: "No Change",
    key: "no_change",
    desc: "Keep the original file name.",
    example: "image.jpg",
  },
  {
    name: "Slug",
    key: "slug",
    desc: "Convert the file name to a URL-friendly slug (lowercase with dashes).",
    example: "image-name.jpg",
  },
  {
    name: "Lowercase",
    key: "lowercase",
    desc: "Convert the file name to all lowercase.",
    example: "image.jpg",
  },
  {
    name: "Uppercase",
    key: "uppercase",
    desc: "Convert the file name to all uppercase.",
    example: "IMAGE.JPG",
  },

  {
    name: "Remove Special Characters",
    key: "remove_special_characters",
    desc: "Remove special characters from the file name.",
    example: "image123.jpg",
  },
  {
    name: "Abbreviate",
    key: "abbreviate",
    desc: "Shorten the file name by keeping only the first few letters.",
    example: "img.jpg",
  },
  {
    name: "Add Date (Prefix)",
    key: "add_date_prefix",
    desc: "Prepend the current date in YYYYMMDD format.",
    example: "20240925-image.jpg",
  },
  {
    name: "Add Timestamp (Suffix)",
    key: "add_timestamp_suffix",
    desc: "Append the current time in HHMMSS format.",
    example: "image-145630.jpg",
  },
  {
    name: "Add File Size (Suffix)",
    key: "add_file_size_suffix",
    desc: "Append the file size to the file name.",
    example: "image-150KB.jpg",
  },
  {
    name: "Add Resolution (Suffix)",
    key: "add_resolution_suffix",
    desc: "Include the image resolution in the file name.",
    example: "image-1920x1080.jpg",
  },
  {
    name: "Add UUID (Suffix)",
    key: "add_uuid_suffix",
    desc: "Append a UUID to the file name.",
    example: "image-f47ac10b.jpg",
  },
  {
    name: "Base64 Encode",
    key: "base64_encode",
    desc: "Convert the file name to base64 format.",
    example: "aW1hZ2U=.jpg",
  },
  {
    name: "Remove Extension",
    key: "remove_extension",
    desc: "Remove the file extension from the name.",
    example: "image",
  },
];

// Utility Functions
const applySlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const applyLowercase = (name: string) => name.toLowerCase();
const applyUppercase = (name: string) => name.toUpperCase();
const removeSpaces = (name: string) => name.replace(/\s+/g, "-");
const removeSpecialCharacters = (name: string) => name.replace(/[^\w\s]/g, "");
const abbreviate = (name: string) => name.slice(0, 3);
const addDatePrefix = (name: string) =>
  `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${name}`;
const addTimestampSuffix = (name: string) =>
  `${name}-${new Date().toISOString().slice(11, 19).replace(/:/g, "")}`;
const addFileSizeSuffix = (name: string, size: number) =>
  `${name}-${Math.round(size / 1024)}KB`;
const addResolutionSuffix = (name: string, width: number, height: number) =>
  `${name}-${width}x${height}`;
const addUuidSuffix = (name: string) => `${name}-${crypto.randomUUID()}`;
const base64Encode = (name: string) => Buffer.from(name).toString("base64");

export const reNameFile = (
  file: File,
  options: string[],
  metaData?: ImageMetaData
): string => {
  if (options.includes("no_change")) {
    return file.name;
  }

  let fileName = file.name.split(".").slice(0, -1).join(".");
  const extension = file.name.split(".").pop();

  const optionFunctions: {
    [key: string]: (name: string, file?: File) => string;
  } = {
    slug: (name: string) => applySlug(removeSpecialCharacters(name)),
    lowercase: applyLowercase,
    uppercase: applyUppercase,
    remove_spaces: removeSpaces,
    remove_special_characters: removeSpecialCharacters,
    abbreviate,
    add_date_prefix: addDatePrefix,
    add_timestamp_suffix: addTimestampSuffix,
    add_file_size_suffix: (name: string) => addFileSizeSuffix(name, file.size),
    add_resolution_suffix: (name: string) =>
      addResolutionSuffix(name, metaData?.width || 0, metaData?.height || 0),
    add_uuid_suffix: addUuidSuffix,
    base64_encode: base64Encode,
  };

  // Apply selected options
  options.forEach((option) => {
    if (optionFunctions[option]) {
      fileName = optionFunctions[option](fileName, file);
    }
  });

  // Return formatted file name
  return options.includes("remove_extension")
    ? fileName
    : `${fileName}.${extension}`;
};

export async function copyImageToClipboard(imageUrl: string): Promise<void> {
  try {
    // Fetch the image as a Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Ensure ClipboardItem is available in the current environment
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error("Clipboard API or ClipboardItem is not supported.");
    }

    // Create a clipboard item with the image blob and its MIME type
    const clipboardItem = new ClipboardItem({ [blob.type]: blob });

    // Copy the image to the clipboard
    await navigator.clipboard.write([clipboardItem]);

    console.log("Image copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
  }
}

export interface ImageMetaData {
  width: number;
  height: number;
  fileName: string;
  fileSize: number; // In bytes
  fileType: string;
  lastModified: Date;
  title?: string;
  author?: string;
  comment?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  exifData?: Record<string, any>; // All EXIF metadata
}

export const getImageMetaData = (image: File): Promise<ImageMetaData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const basicMetaData: ImageMetaData = {
          width: img.naturalWidth,
          height: img.naturalHeight,
          fileName: image.name,
          fileSize: image.size,
          fileType: image.type,
          lastModified: new Date(image.lastModified),
        };

        // Extract EXIF data
        // EXIF.getData(img, function () {
        //   const exifData = EXIF.getAllTags(this); // Get all EXIF tags

        //   // Title (ImageDescription), Author (Artist), Comment (UserComment), GPS data (Latitude and Longitude)
        //   const title = exifData.ImageDescription || "";
        //   const author = exifData.Artist || "";
        //   const comment = exifData.UserComment || ""; // Get comment from EXIF
        //   const latitude = exifData.GPSLatitude
        //     ? convertDMSToDD(exifData.GPSLatitude, exifData.GPSLatitudeRef)
        //     : null;
        //   const longitude = exifData.GPSLongitude
        //     ? convertDMSToDD(exifData.GPSLongitude, exifData.GPSLongitudeRef)
        //     : null;

        //   const location =
        //     latitude && longitude ? { latitude, longitude } : undefined;

        //   resolve({
        //     ...basicMetaData,
        //     title,
        //     author,
        //     comment,
        //     location,
        //     exifData, // Include all EXIF metadata
        //   });
        // });

        resolve(basicMetaData);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(image);
  });
};

// Utility function to convert GPS coordinates from DMS to Decimal Degrees (DD)
export const convertDMSToDD = (
  dmsArray: [number, number, number],
  ref: string
): number => {
  const [degrees, minutes, seconds] = dmsArray;
  let decimal = degrees + minutes / 60 + seconds / 3600;

  if (ref === "S" || ref === "W") {
    decimal = decimal * -1;
  }

  return decimal;
};
