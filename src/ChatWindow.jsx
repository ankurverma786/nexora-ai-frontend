import "./ChatWindow.css";
import "./ChatWindow.css";
import ChatNavbar from "./components/chat/ChatNavbar.jsx";
import UploadedFile from "./components/chat/UploadFile.jsx";
import ChatInput from "./components/chat/ChatInput.jsx";
import ChatLoader from "./components/chat/ChatLoader.jsx";

import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useChat from "./hooks/useChat.js";
import useDocumentUpload from "./hooks/useDocumentUpload.js";
import useDocumentStatus from "./components/document/useDocumentStatus.js";



function ChatWindow() {
  const {
    prompt,
    setPrompt,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null);
  const [statusError, setStatusError] = useState("");

  const { uploadingFile, handleFileChange } = useDocumentUpload({
    currThreadId,
    navigate,
    setSelectedFile,
    setDocumentId,
    setDocumentStatus,
    setStatusError,
  });

  const { loading, getReply } = useChat({
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
  });

  useDocumentStatus({
    documentId,
    setDocumentStatus,
    setStatusError,
  });

  const fileInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setSelectedFile(null);
    setDocumentId(null);
    setDocumentStatus(null);
    setStatusError("");
  }, [currThreadId]);

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setDocumentId(null);
    setDocumentStatus(null);
    setStatusError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="chatWindow">
      <ChatNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Chat></Chat>
      <ChatLoader loading={loading} />
      <div className="chatInput">
        {/* Uploaded document */}

        <UploadedFile
          selectedFile={selectedFile}
          uploadingFile={uploadingFile}
          documentStatus={documentStatus}
          statusError={statusError}
          onRemove={removeSelectedFile}
        />

        <ChatInput
          prompt={prompt}
          setPrompt={setPrompt}
          selectedFile={selectedFile}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          getReply={getReply}
        />

        <p className="info">
          Nexora Ai can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
