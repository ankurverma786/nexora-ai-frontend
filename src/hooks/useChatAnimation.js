
import { useEffect, useState } from "react";

function useChatAnimation({ prevChats, reply }) {
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply == null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const words = reply.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, index + 1).join(" "));

      index++;

      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return latestReply;
}

export default useChatAnimation;
