import React, { useState, useContext } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from "../../context/context";

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const { chats, loadChat, newChat } = useContext(Context);



  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
            <div className="new-chat" onClick={newChat}>
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended && (
                <div className="recent">
                    <p className="recent-title">Recent</p>
                    {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => loadChat(chat.id)}
                        className="recent-entry"
                    >
                        <img src={assets.message_icon} alt="chat icon" />
                        <p>{chat.title}</p>
                    </div>
                    ))}
                </div>
            )}

        </div>

        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>

            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>

            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar