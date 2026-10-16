import API_BASE_URL from "../api";

export const sendChatMessage = async ({
  message,
  threadId,
  token,
}) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      threadId,
    }),
  };

  const endpoint = token
    ? `${API_BASE_URL}/api/chat`
    : `${API_BASE_URL}/api/guest-chat`;

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get a response");
  }

  return data;
};