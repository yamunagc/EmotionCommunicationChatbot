import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'
import { useNavigate } from 'react-router-dom';


const Main = () => {

    const {onSent, chatHistory, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    const navigate = useNavigate();

    const goToLiveTranscription = () => {
      navigate('/audio'); 
    };
    

    const goToLoginSignup = () => {
        navigate('/loginsignup'); 
      };

  return (
    <div className='main'>
        <div className="nav">
            <img src={assets.logo_icon} alt="" />
            <img 
            src={assets.user_icon} 
            alt="Account" 
            style={{ cursor: 'pointer' }}
            onClick={goToLoginSignup}
            />
        </div>

        <div className="main-container">

        {chatHistory.length === 0 ? (
            <>
                <div className="greet">
                <p><span>Hello, friend!</span></p>
                <p>Want to talk about your day?</p>
                </div>

                <div className="cards">
                {[
                    {
                    text: "I'm having trouble understanding how I feel right now. Can you help me make sense of it?",
                    icon: assets.message_icon
                    },
                    {
                    text: "I’ve been thinking about something and could use a safe space to talk it out.",
                    icon: assets.idea_icon
                    },
                    {
                    text: "Can you share something comforting or kind that might help me feel more at ease?",
                    icon: assets.peace_icon
                    },
                    {
                    text: "I want to write about how I’m feeling, but I don’t know how to start. Can you guide me?",
                    icon: assets.journal_icon
                    }
                ].map((card, index) => (
                    <div key={index} className="card" onClick={() => { setInput(card.text); onSent(card.text); }}>
                    <p>{card.text}</p>
                    <img src={card.icon} alt="icon" />
                    </div>
                ))}
                </div>
            </>
            ) : (
                <div className="result">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className="result-title">
                        <img src={msg.sender === "user" ? assets.user_icon : assets.logo_icon} alt="avatar" />
                        <p>{msg.message}</p>
                        </div>
                    ))}

                    {/* Only show this block if typing effect is happening */}
                    {resultData && (
                        <div className="result-title">
                        <img src={assets.logo_icon} alt="avatar" />
                        <p>{resultData}</p>
                        </div>
                    )}
                </div>   
        )}


            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Enter your message here' />
                    <div>
                        
                        {/* <img src={assets.mic_icon} alt="" /> */}
                        <div title="Start live transcription" className="tooltip-wrapper">
                            <img
                            src={assets.mic_icon}
                            alt="Mic"
                            onClick={goToLiveTranscription}
                            />
                            <span className="tooltip-text">Audio Mode</span>
                        </div>
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className='bottom-info'> This is your space. Let’s take a moment together. </p>
            </div>

        </div>
    </div>

  )
}

export default Main