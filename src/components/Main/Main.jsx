import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'
import { useNavigate } from 'react-router-dom';


const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

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
            <p> Emotive Conversational Agent</p>
            <img 
            src={assets.user_icon} 
            alt="Account" 
            style={{ cursor: 'pointer' }}
            onClick={goToLoginSignup}
            />
        </div>

        <div className="main-container">

            {!showResult
            ?<>
            <div className="greet">
                <p><span>Hello, friend!</span></p>
                <p>Want to talk about your day?</p>
            </div>

            <div className="cards">
                <div className="card">
                    <p>I'm having trouble understanding how I feel right now. Can you help me make sense of it?</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>I’ve been thinking about something and could use a safe space to talk it out.</p>
                    <img src={assets.idea_icon} alt="" />
                </div>
                <div className="card">
                    <p>Can you share something comforting or kind that might help me feel more at ease?</p>
                    <img src={assets.peace_icon} alt="" />
                </div>
                <div className="card">
                    <p>I want to write about how I’m feeling, but I don’t know how to start. Can you guide me?</p>
                    <img src={assets.journal_icon} alt="" />
                </div>
            </div>
            </>
            :<div className='result'>
                <div className='result-title'>
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>

                <div className="result-data">
                    <img src={assets.user_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                    
                </div>
            </div>
            }

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
                <p className='bottom-info'> Footer message </p>
            </div>

        </div>
    </div>

  )
}

export default Main