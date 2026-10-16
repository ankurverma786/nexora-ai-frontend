
import { useCallback, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import {
  fetchThreads,
  fetchThreadMessages,
  deleteThreadRequest,
} from "../services/threadService.js";

function useThreads({
  setAllThreads,
  currThreadId,
  setCurrThreadId,
  setPrompt,
  setNewChat,
  setReply,
  setPrevChats,
  navigate,
}) {
  const getAllThreads = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAllThreads([]);
      return;
    }

    try {
      const threads = await fetchThreads(token);
      setAllThreads(threads);
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    }
  }, [setAllThreads]);

  useEffect(() => {
    getAllThreads();
  }, [getAllThreads, currThreadId]);

  const createNewChat = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (threadId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const messages = await fetchThreadMessages(threadId, token);

      setCurrThreadId(threadId);
      setPrevChats(messages);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.error("Failed to change thread:", error);
    }
  };

  const deleteThread = async (threadId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await deleteThreadRequest(threadId, token);

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.error("Failed to delete thread:", error);
    }
  };

  return {
    getAllThreads,
    createNewChat,
    changeThread,
    deleteThread,
  };
}

export default useThreads;
