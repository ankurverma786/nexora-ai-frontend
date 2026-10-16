
import { ScaleLoader } from "react-spinners";

function ChatLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="chat-loader-overlay">
      <ScaleLoader color="#ffffff" />
    </div>
  );
}

export default ChatLoader;
