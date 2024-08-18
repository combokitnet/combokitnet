import axios from "axios";

const IMAGE_URL = "https://image_v2.combokit.net";

export const apiImageCompress = async ({
  file,
  quality,
  compress,
}: {
  file: File;
  quality?: string;
  compress?: "lossy" | "lossless";
}) => {
  let data = new FormData();
  data.append("file", file);
  data.append("quality", quality || "0.5");
  data.append("compress", compress || "lossy");

  let config = {
    method: "post",
    url: `${IMAGE_URL}/compress?name=${file.name}`,
    data: data,
  };
  return axios.request(config);
};

export const downloadImage = async (
  imageUrl: string,
  fileName: string = "image.jpg"
): Promise<void> => {
  try {
    const response = await axios.get<Blob>(imageUrl, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the image", error);
  }
};
