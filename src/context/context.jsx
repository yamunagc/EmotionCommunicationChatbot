import { createContext, useState } from "react";
import runChat from "../config/chatbot";
import { v4 as uuidv4 } from "uuid"; 

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [chats, setChats] = useState([]); // all saved chats
    const [currentChatId, setCurrentChatId] = useState(null); // active chat



    const delayPara = (index, nextWord) => {
        setTimeout(() => {
          setResultData(prev => prev + nextWord); // This is what makes the typing visible
        }, 75 * index);
      };

      const newChat = () => {
        setChatHistory([]);
        setCurrentChatId(null);
        setResultData("");
        setRecentPrompt("");
      };
      
      const loadChat = (chatId) => {
        const chat = chats.find(c => c.id === chatId);
        if (!chat) return;
        setChatHistory(chat.history);
        setCurrentChatId(chat.id);
        setShowResult(true);
        setResultData("");
      };
      

      const onSent = async (prompt) => {
        const message = prompt || input;
        if (!message.trim()) return;
      
        setInput("");
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(message);
      
        // 📌 Create a new chat if none exists
        if (!currentChatId) {
          const newId = uuidv4();
          const newChat = {
            id: newId,
            title: message.length > 20 ? message.slice(0, 20) + "..." : message,
            history: [{ sender: "user", message }]
          };
          setChats(prev => [...prev, newChat]);
          setCurrentChatId(newId);
          setChatHistory([{ sender: "user", message }]);
        } else {
          setChatHistory(prev => [...prev, { sender: "user", message }]);
          setChats(prev => prev.map(chat =>
            chat.id === currentChatId
              ? { ...chat, history: [...chat.history, { sender: "user", message }] }
              : chat
          ));
        }
      
        const response = await runChat(message);
        const responseArray = response.split(" ");
        let fullMessage = "";
      
        responseArray.forEach((word, i) => {
          setTimeout(() => {
            fullMessage += word + " ";
            setResultData(fullMessage);
          }, 75 * i);
        });
      
        setTimeout(() => {
          setChatHistory(prev => [...prev, { sender: "bot", message: fullMessage.trim() }]);
          setResultData("");
          setLoading(false);
      
          // Update chat list with bot reply
          setChats(prev => prev.map(chat =>
            chat.id === currentChatId
              ? { ...chat, history: [...chat.history, { sender: "bot", message: fullMessage.trim() }] }
              : chat
          ));
        }, 75 * responseArray.length + 100);
      };
      
    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        chatHistory,
        setChatHistory,
        chats,
        setChats,
        currentChatId,
        setCurrentChatId,
        newChat,
        loadChat

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider