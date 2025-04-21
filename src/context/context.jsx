import { createContext, useState } from "react";
import runChat from "../config/chatbot";


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");
    const [chatHistory, setChatHistory] = useState([]);


    const delayPara = (index, nextWord) => {
        setTimeout(() => {
          setResultData(prev => prev + nextWord); // This is what makes the typing visible
        }, 75 * index);
      };

      const onSent = async (prompt) => {
        const message = prompt || input;
        if (!message.trim()) return;
      
        setInput("");
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(message);
      
        // Add user's message
        setChatHistory(prev => [...prev, { sender: "user", message }]);
      
        const response = await runChat(message);
        const responseArray = response.split(" ");
      
        let fullMessage = "";
      
        responseArray.forEach((word, i) => {
          setTimeout(() => {
            fullMessage += word + " ";
            setResultData(fullMessage);
          }, 75 * i);
        });
      
        // After typing is done, move to history
        setTimeout(() => {
          setChatHistory(prev => [...prev, { sender: "bot", message: fullMessage.trim() }]);
          setResultData(""); // Clear temporary message
          setLoading(false);
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
        setChatHistory

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider