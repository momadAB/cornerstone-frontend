// downloadFile.js
import { axiosInstance } from "./config";

export async function downloadPDF(
  fileId: string,
  userId: string
): Promise<void> {
  try {
    // You can now pass the additional parameter (userId) to the API request
    const response = await axiosInstance.get(`/api/files/${fileId}`, {
      params: { userId }, // Pass userId as a query parameter (you can adjust this as needed)
      responseType: "blob", // Set responseType to 'blob' for file download
    });

    // Create a link element to trigger file download
    const link = document.createElement("a");
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    link.href = fileURL;
    link.download = `${userId}_${fileId}.pdf`; // Name the file, including userId in filename
    link.click(); // Trigger download

    // Clean up the URL object after the download starts
    window.URL.revokeObjectURL(fileURL);
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
    throw new Error("Failed to download PDF");
  }
}
