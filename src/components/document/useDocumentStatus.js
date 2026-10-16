
import { useEffect } from "react";
import { getDocumentStatus } from "../../services/documentService.js";

function useDocumentStatus({
  documentId,
  setDocumentStatus,
  setStatusError,
}) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!documentId || !token) return;

    let cancelled = false;
    let timeoutId;

    const checkStatus = async () => {
      try {
        const data = await getDocumentStatus({
          documentId,
          token,
        });

        if (cancelled) return;

        setDocumentStatus(data.status);
        setStatusError(data.errorMessage || "");

        if (
          data.status === "queued" ||
          data.status === "processing"
        ) {
          timeoutId = setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        if (cancelled) return;

        setStatusError(error.message);
        timeoutId = setTimeout(checkStatus, 3000);
      }
    };

    checkStatus();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [
    documentId,
    setDocumentStatus,
    setStatusError,
  ]);
}

export default useDocumentStatus;