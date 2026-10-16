import API_BASE_URL from "../api";

export const uploadDocument = async ({ file, threadId, token }) => {
  const formData = new FormData();

  formData.append("document", file);
  formData.append("threadId", threadId);

  const response = await fetch(
    `${API_BASE_URL}/api/document/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "PDF upload failed");
  }

  if (!data.documentId) {
    throw new Error("Document ID was not returned by the server");
  }

  return data;
};

export const getDocumentStatus = async ({ documentId, token }) => {
  const response = await fetch(
    `${API_BASE_URL}/api/document/status/${documentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch document status");
  }

  return data;
};
