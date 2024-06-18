import React from 'react'
import "../assets/Chat.css"

const Chat = ({pos, content}) => {
  return (
    <div className={`chat-container ${pos}`}>
        <div className="icon">
            <img src="/src/assets/baymax.jpg" alt="Baymax" />
        </div>
        <div className="message-container">
            <p>{content}</p>
        </div>
    </div>
  )
}

export default Chat