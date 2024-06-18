import React, {useState, useEffect} from 'react'
import "./assets/App.css"
import Chat from './components/Chat'
import Rating from './components/Rating'

const App = () => {

  const [firstRatingFinished, setFirstRatingFinished] = useState(false);
  const [firstRating, setFirstRating] = useState(0);
  const [secondRatingFinished, setSecondRatingFinished] = useState(false);
  const [secondRating, setSecondRating] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleFirstRatingClick = () => {
    setFirstRatingFinished(true);
  }

  const handleSecondRatingClick = () => {
    setSecondRatingFinished(true);
  }

  useEffect(() => {
    if (firstRatingFinished) {
      setTimeout(() => { setProgress(1) }, 500)
    }
  }, [firstRatingFinished])

  return (
    <div className="app">
      <div className="heading">
        <h1>Automatic Tipper</h1>
      </div>
      <div className="chats-container">
        
        <Chat pos="left" content={"Hi, I am your automatic tipper! How would you rate the restaurant’s overall service?"} />

        <Rating finished={firstRatingFinished} handleClick={handleFirstRatingClick} delay={500} currentRating={firstRating} setCurrentRating={setFirstRating} />

        {firstRatingFinished && 
          <>
            <Chat pos="right" content={`A solid ${firstRating}`} />
          </>
        }

        {progress === 1 &&
          <>
            <Chat pos="left" content={"Ooh. What about their food quality?"} />
            <Rating finished={secondRatingFinished} handleClick={handleSecondRatingClick} delay={500} currentRating={secondRating} setCurrentRating={setSecondRating} />
          </>
        }

        {secondRatingFinished && 
          <>
            <Chat pos="right" content={`A solid ${secondRating}`} />
          </>
        }

      </div>
    </div>
  )
}

export default App