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
