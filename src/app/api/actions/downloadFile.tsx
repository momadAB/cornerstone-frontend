import { axiosInstance } from "./config";

export async function downloadPDF(fileId: string): Promise<void> {
  try {
    const response = await axiosInstance.get(`/api/files/${fileId}`, {
      responseType: "blob", // Set responseType to 'blob' for file download
    });

    // Create a link element to trigger file download
    const link = document.createElement("a");
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    link.href = fileURL;
    link.download = `document_${fileId}.pdf`; // Name the file
    link.click(); // Trigger download

    // Clean up the URL object after the download starts
    window.URL.revokeObjectURL(fileURL);
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
    console.log("Error downloading PDF:", error);

    throw new Error("Failed to download PDF");
  }
}
