import { baseUrl, axiosInstance } from "./config"; // Define base URL and getHeaders for API requests
import { Buffer } from "buffer"; // Node.js Buffer library

export const fetchImage = async (fileId, token) => {
  console.log(fileId);
  try {
    const response = await axiosInstance.get(`/api/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer", // This is important to fetch image data as a binary buffer
    });

    const base64Data = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/png;base64,${base64Data}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image");
  }
};
