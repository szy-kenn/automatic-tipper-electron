import React, {useState, useEffect} from 'react'
import "../assets/Chat.css"

const Chat = ({pos, delay, handleMessage, children}) => {

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsShown(true);
      handleMessage((prev) => prev+1);

    }, delay);
  
    return () => {
        clearTimeout(timer);
    }
  }, [])

  if (!isShown) return;

  return (
    <div className={`chat-container ${pos}`}>
        <div className="icon">
          {
            pos === "left"? <img src="/src/assets/baymax.jpg" alt="Baymax" /> : <img src="/src/assets/avatar.svg" alt="Avatar" />
          }
        </div>
        <div className="message-container">
            {children}
        </div>
    </div>
  )
}

export default Chat