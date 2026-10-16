
import { useState } from "react";
import { uploadDocument } from "../services/documentService.js";

function useDocumentUpload({
  currThreadId,
  navigate,
  setSelectedFile,
  setDocumentId,
  setDocumentStatus,
  setStatusError,
}) {
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to upload documents.");
      navigate("/login");
      e.target.value = "";
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingFile(true);
      setSelectedFile(file);
      setStatusError("");

      console.log("Current Thread ID:", currThreadId);
      console.log("🚀 PDF upload started");

      const data = await uploadDocument({
        file,
        threadId: currThreadId,
        token,
      });

      setDocumentId(data.documentId);
      setDocumentStatus(data.status || "queued");

      console.log("✅ Document queued:", data);
    } catch (error) {
      console.error("Document upload error:", error);

      setDocumentStatus("failed");
      setStatusError(error.message || "Document upload failed");

      alert(error.message || "Document upload failed");
    } finally {
      setUploadingFile(false);

      // Same file dobara select karne ke liye
      e.target.value = "";
    }
  };

  return {
    uploadingFile,
    handleFileChange,
  };
}

export default useDocumentUpload;
