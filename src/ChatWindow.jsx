import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const fileInputRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
);

  const navigate = useNavigate();

  const handleFileChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // Login check
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first to upload documents.");
        navigate("/login");
        return;
    }

    // Only PDF
    if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
    }

    try {

        setUploadingFile(true);
        setSelectedFile(file);

        const formData = new FormData();

        formData.append("document", file);
        console.log("Current Thread ID:", currThreadId);
        formData.append("threadId", currThreadId);

        console.log("🚀 1. Upload function started");
        const response = await fetch(
            "http://localhost:8080/api/document/upload",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                },

                body: formData
            }
        );
        console.log("🚀 2. Fetch completed");

        const data = await response.json();
console.log("🚀 3. JSON parsed");
console.log("Upload status:", response.status);
console.log("Upload response:", data);

        if (!response.ok) {
            throw new Error(
                data?.message || "Document upload failed"
            );
        }

        // Show uploaded file in UI

        console.log("Document uploaded successfully");

    } catch (error) {

        console.error("Document upload error:", error);

        alert(error.message);

    } finally {

        setUploadingFile(false);

        // Same file dobara select karne ke liye
        e.target.value = "";
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };





  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const token = localStorage.getItem("token");
   const options = {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
    },

    body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
    }),
};

if (token) {
    options.headers.Authorization = `Bearer ${token}`;
}
const endpoint = token
      ? "http://localhost:8080/api/chat"
      : "http://localhost:8080/api/guest-chat";

      const startTime = performance.now();
    try {
        // setReply(""); 
      const response = await fetch(endpoint, options);
      const data = await response.json();

    //   console.log("Status:", response.status);
    //   console.log("Response:", data);
         const endTime = performance.now();

    const responseTime = endTime - startTime;

    


      if (!response.ok) {
            console.log("Chat failed:", data);
            return;
        }
    //   setReply(data.reply);
    //   setSelectedFile(null);
                setPrevChats(prev => [
  ...prev,
  {
    role: "user",
    content: prompt
  },
  {
    role: "assistant",
    content: data.reply
  }
]);

setReply(data.reply);
setPrompt("");
setSelectedFile(null);
    } catch (err) {
      console.log(err);
    }finally {
    setLoading(false);
    }
  };


//   useEffect(()=>{
//     if(prompt && reply){
//       setPrevChats(prevChats =>(
//         [...prevChats,{
//           role: "user",
//           content: prompt
//       },{
//         role: "assistant",
//         content: reply
//       }]
//     ));
//     }
//     setPrompt("");
//   },[reply]);


  // const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
};
  

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          Nexora Ai <i className="fa-solid fa-chevron-down"></i>
        </span>

     <div className="authButtons">

    {isLoggedIn ? (

        <button onClick={handleLogout}>
            Logout
        </button>

    ) : (

        <>
            <button onClick={() => navigate("/login")}>
                Login
            </button>

            <button onClick={() => navigate("/signup")}>
                Sign Up
            </button>
        </>

    )}

</div>


      </div>

      <Chat></Chat>
      <div className="loader">
        <ScaleLoader color="#fff" loading={loading} />
      </div>
      <div className="chatInput">

    {/* Uploaded document */}
    {selectedFile && (
        <div className="selectedFile">

            <div className="fileInfo">
                <i className="fa-solid fa-file-pdf"></i>

                <span>
                    {selectedFile.name}
                </span>

                {uploadingFile && (
                    <small>Uploading...</small>
                )}
            </div>

            {!uploadingFile && (
                <button
                    className="removeFile"
                    onClick={removeSelectedFile}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            )}

        </div>
    )}

    <div className="inputBox">

        {/* Hidden PDF input */}
        <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="fileInput"
            onChange={handleFileChange}
        />

        {/* Plus button */}
        <button
            type="button"
            className="attachButton"
            onClick={() => fileInputRef.current.click()}
        >
            <i className="fa-solid fa-plus"></i>
        </button>

        {/* Message input */}
        <input
            className="messageInput"
            placeholder={
                selectedFile
                    ? "Ask about your document..."
                    : "Ask anything"
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    getReply();
                }
            }}
        />

        {/* Send */}
        <div
            id="submit"
            onClick={getReply}
        >
            <i className="fa-solid fa-paper-plane"></i>
        </div>

    </div>

    <p className="info">
        Nexora Ai can make mistakes. Check important info. See Cookie
        Preferences.
    </p>

</div>
    </div>
  );
}

export default ChatWindow;
