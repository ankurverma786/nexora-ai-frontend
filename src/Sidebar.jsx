import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import { useNavigate } from "react-router-dom";


function sidebar() {
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
  const getAllThreads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
            setAllThreads([]);
            return;
        }
      const response = await fetch("http://localhost:8080/api/thread",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      const res = await response.json();
      if (!response.ok) {
            console.log("Failed to fetch threads:", res);
            return;
      }
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {

    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
      return;
    }


    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteThread = async(threadId) =>{
    const token = localStorage.getItem("token");
    try{
        const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE",headers: {
            Authorization: `Bearer ${token}`,
        },});
        const res = await response.json();

        setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
        if(threadId === currThreadId){
            createNewChat();
        }
    }catch(err){
        console.log(err);
    }
  }

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="src/assets/blacklogo.png" alt="gpt logo" />
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

export default sidebar;
