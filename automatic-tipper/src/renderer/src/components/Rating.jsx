import React, {useState, useEffect} from 'react'
import "../assets/Star.css"
import Star from './Star'

const Rating = ({finished, handleClick, delay, currentRating, setCurrentRating}) => {

//   const [currentRating, setCurrentRating] = useState(5);
  const [isShown, setIsShown] = useState(false);

  const handleHover = (e) => {
    const container = e.target;
    const x = e.clientX - container.getBoundingClientRect().left;
    const y = e.clientY - container.getBoundingClientRect().top;
    setCurrentRating(parseFloat(container.dataset.id) + (x >= 20 ? 1 : (x >= 12.5 ? .5 : 0)));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsShown(true);
    }, delay);
  
    return () => {
        clearTimeout(timer);
    }
  }, [])
  

  const handleDivHover = (e) => {

    if (e.target.className !== "rating-container") {
        return;
    }

    const container = e.target;
    const _x = e.clientX - container.getBoundingClientRect().left;
    const _y = e.clientY - container.getBoundingClientRect().top;

    if (_x  < 60) {
        setCurrentRating(0);
    }
  }

  if (!isShown) return;

  return (
    <div className={`rating-container ${finished ? "finished" : ""}`} onMouseMove={handleDivHover} onClick={handleClick}>
        <Star handleHover={handleHover} idx={0} type={currentRating >= 1 ? "full" : currentRating > 0 ? "half": "no"} />
        <Star handleHover={handleHover} idx={1} type={currentRating >= 2 ? "full" : currentRating > 1 ? "half": "no"} />
        <Star handleHover={handleHover} idx={2} type={currentRating >= 3 ? "full" : currentRating > 2 ? "half": "no"} />
        <Star handleHover={handleHover} idx={3} type={currentRating >= 4 ? "full" : currentRating > 3 ? "half": "no"} />
        <Star handleHover={handleHover} idx={4} type={currentRating >= 5 ? "full" : currentRating > 4 ? "half": "no"} />
        {/* <HalfStar />
        <NoStar /> */}
    </div>
  )
}

export default Rating