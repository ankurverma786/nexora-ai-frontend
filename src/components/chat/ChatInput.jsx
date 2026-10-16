import "./ChatInput.css";

function ChatInput({
  prompt,
  setPrompt,
  selectedFile,
  fileInputRef,
  handleFileChange,
  getReply,
}) {
  return (
    <div className="inputBox">
      {/* Hidden PDF input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="fileInput"
        onChange={handleFileChange}
      />

      {/* Attach button */}
      <button
        type="button"
        className="attachButton"
        onClick={() => fileInputRef.current?.click()}
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      {/* Message input */}
      <input
        className="messageInput"
        placeholder={
          selectedFile ? "Ask about your document..." : "Ask anything"
        }
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            getReply();
          }
        }}
      />

      {/* Send button */}

      <button
        type="button"
        id="submit"
        onClick={getReply}
        aria-label="Send message"
        disabled={!prompt.trim()}
      >
        <i className="fa-solid fa-paper-plane" />
      </button>
    </div>
  );
}

export default ChatInput;
