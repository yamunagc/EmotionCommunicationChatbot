import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'
import { useNavigate } from 'react-router-dom';


const Main = () => {

    const navigate = useNavigate();

    const goToLiveTranscription = () => {
      navigate('/audio'); // or whatever your route is
    };
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);


  return (
    <div className='main'>
        <div className="nav">
            <p>Chatbot</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">

            {!showResult
            ?<>
            <div className="greet">
                <p><span>Hello, Yamuna</span></p>
                <p>How are you today?</p>
            </div>

            <div className="cards">
                <div className="card">
                    <p>Can you recommend...</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Can you suggest...</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Can you recommend...</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Can you recommend...</p>
                    <img src={assets.message_icon} alt="" />
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
                        <img src={assets.video_icon} alt="" />
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