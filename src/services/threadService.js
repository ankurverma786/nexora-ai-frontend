import API_BASE_URL from "../api";

const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const fetchThreads = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/thread`, {
    headers: getAuthHeaders(token),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch threads");
  }

  return data.map((thread) => ({
    threadId: thread.threadId,
    title: thread.title,
  }));
};

export const fetchThreadMessages = async (threadId, token) => {
  const response = await fetch(`${API_BASE_URL}/api/thread/${threadId}`, {
    headers: getAuthHeaders(token),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch conversation");
  }

  return data;
};

export const deleteThreadRequest = async (threadId, token) => {
  const response = await fetch(`${API_BASE_URL}/api/thread/${threadId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete thread");
  }

  return data;
};
