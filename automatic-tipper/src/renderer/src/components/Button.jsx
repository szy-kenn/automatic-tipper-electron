import React, {useState, useEffect} from 'react'
import "../assets/Button.css"

const Button = ({content, delay, handleUpdate, onClick}) => {

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {

    
    const timer = setTimeout(() => {
      setIsShown(true);
      handleUpdate((prev) => prev+1);
    }, delay);
  
    return () => {
        clearTimeout(timer);
    }
  }, [])

  if (!isShown) return;

  return (
    <button className="btn btn-primary" onClick={onClick}>{content}</button>
  )
}

export default Button