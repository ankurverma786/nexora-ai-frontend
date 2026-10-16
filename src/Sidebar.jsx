
import "./Sidebar.css";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import { useNavigate } from "react-router-dom";
import useThreads from "./hooks/useThreads.js";
import blackLogo from "./assets/blacklogo.png";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setPrompt,
    setNewChat,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const {
    createNewChat,
    changeThread,
    deleteThread,
  } = useThreads({
    allThreads,
    setAllThreads,
    currThreadId,
    setCurrThreadId,
    setPrompt,
    setNewChat,
    setReply,
    setPrevChats,
    navigate,
  });

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src={blackLogo} alt="Nexora AI logo" />
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() => changeThread(thread.threadId)}
          >
            {thread.title}

            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Ankur &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;