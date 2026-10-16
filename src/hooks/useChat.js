
import { useState } from "react";
import { sendChatMessage } from "../services/chatService.js";

function useChat({
  prompt,
  setPrompt,
  currThreadId,
  setPrevChats,
  setReply,
  setNewChat,
  uploadingFile,
  documentId,
  documentStatus,
  setSelectedFile,
  setDocumentId,
  setDocumentStatus,
  setStatusError,
}) {
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    const message = prompt.trim();

    if (!message) return;

    if (uploadingFile) {
      alert("Please wait for the PDF upload to finish.");
      return;
    }

    if (documentId && documentStatus !== "completed") {
      alert(
        documentStatus === "failed"
          ? "PDF processing failed. Please upload it again."
          : "Please wait until PDF processing completes."
      );
      return;
    }

    setLoading(true);
    setNewChat(false);

    const token = localStorage.getItem("token");

    try {
      const data = await sendChatMessage({
        message,
        threadId: currThreadId,
        token,
      });

      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: data.reply },
      ]);

      setReply(data.reply);
      setPrompt("");

      setSelectedFile(null);
      setDocumentId(null);
      setDocumentStatus(null);
      setStatusError("");
    } catch (error) {
      console.error("Chat error:", error);
      alert(error.message || "Unable to get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, getReply };
}

export default useChat;
