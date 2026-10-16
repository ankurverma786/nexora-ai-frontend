
import { ScaleLoader } from "react-spinners";

function ChatLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="loader">
      <ScaleLoader color="#ffffff" />
    </div>
  );
}

export default ChatLoader;
