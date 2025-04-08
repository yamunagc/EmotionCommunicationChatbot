import React from 'react'
import './Main.css'
import {assets} from '../../assets/assets'

const Main = () => {
  return (
    <div className='main'>
        <div className="nav">
            <p>Chatbot</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">
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

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter your message here' />
                    <div>
                        <img src={assets.video_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className='bottom-info'> Footer message </p>
            </div>

        </div>
    </div>

  )
}

export default Main