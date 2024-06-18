import React, {useState, useRef, useEffect} from 'react'
import "./assets/App.css"
import Chat from './components/Chat'
import Rating from './components/Rating'
import LineChart from './components/LineChart'
import { delicious_mf, excellent_mf, good_mf, mediocre_mf, poor_mf, rancid_mf, serviceLabels, foodQualityLabels, applyRules, z, calculateWeightedAverage } from './classes/utils'
import BarChart from './components/BarChart'
import Button from './components/Button'

const App = () => {

  const appRef = useRef();
  const chatsContainerRef = useRef();

  const [messageCounter, setMessageCounter] = useState(0);
  const [firstRatingFinished, setFirstRatingFinished] = useState(false);
  const [firstRating, setFirstRating] = useState(0);
  const [secondRatingFinished, setSecondRatingFinished] = useState(false);
  const [secondRating, setSecondRating] = useState(0);

  const [calcFinished, setCalcFinished] = useState(false);

  const [fuzzifiedServiceRating, setFuzzifiedServiceRating] = useState([]);
  const [fuzzifiedFoodRating, setFuzzifiedFoodRating] = useState([]);

  const [appliedRules, setAppliedRules] = useState([]);
  const [weightedAverage, setWeightedAverage] = useState(0);

  const handleFirstRatingClick = () => {
    setFirstRatingFinished(true);
    setFuzzifiedServiceRating([poor_mf.calculate(firstRating), good_mf.calculate(firstRating), excellent_mf.calculate(firstRating)]);
  }

  const handleSecondRatingClick = () => {
    setSecondRatingFinished(true);
    setFuzzifiedFoodRating([rancid_mf.calculate(secondRating), mediocre_mf.calculate(secondRating), delicious_mf.calculate(secondRating)]);

    const _appliedRules = applyRules(secondRating, firstRating); 
    setAppliedRules(_appliedRules);
    setWeightedAverage(calculateWeightedAverage(_appliedRules));
  }

  const updateScroll = () => {

    chatsContainerRef.current.scrollTop = chatsContainerRef.current.scrollHeight;

    // const scrollToBottom = () => {
      // const scrollHeight = chatsContainerRef.current.scrollHeight;
      // const scrollTop = chatsContainerRef.current.scrollTop;
    //   const difference = scrollHeight - scrollTop;
    //   const perTick = difference / 125;

    //   requestAnimationFrame(() => {
    //     chatsContainerRef.current.scrollTop = scrollTop + perTick;
    //     if (chatsContainerRef.current.scrollTop < scrollHeight) {
    //       scrollToBottom();
    //     }
    //   });
    // };

    // scrollToBottom();

  }

  const delayInvoke = (func, delay) => {
    setTimeout(func, delay);
  }

  const rerunApp = () => {
    window.location.reload();
  }

  useEffect(() => {
    updateScroll();
    console.log("here");
  }, [messageCounter]);

  return (
    <div className="app" ref={appRef}>
      <div className="heading">
        <h1>Automatic Tipper</h1>
      </div>
      <div className="chats-container" ref={chatsContainerRef}>
        
        <Chat pos="left"delay={500} handleMessage={setMessageCounter}> 
          <p>
            Hi! I am your automatic tipper. How would you rate the restaurant's <span style={{fontWeight: "bold"}}>overall service</span>?
          </p> 
          </Chat>

        <Rating finished={firstRatingFinished} handleClick={handleFirstRatingClick} currentRating={firstRating} setCurrentRating={setFirstRating} delay={1000} />

        {firstRatingFinished && 
          <>
            <Chat pos="right" delay={250} handleMessage={setMessageCounter}>
              <p>
                I'll give it a {firstRating}.
              </p>
            </Chat>


            <Chat pos={"left"} delay={750} handleMessage={setMessageCounter}>
              <div className="chart-container">
                <LineChart mfs={[poor_mf, good_mf, excellent_mf]} mfsLabels={serviceLabels} rating={firstRating} title={"Service"} />
              </div>
            </Chat>

            <Chat pos={"left"} delay={1250} handleMessage={setMessageCounter}>
              <p>Here's the fuzzified values of their overall service:</p>
              {fuzzifiedServiceRating.map((mf, idx) => <p key={idx}> <span style={{fontWeight: "bold"}}>{serviceLabels[idx]}:</span> {mf}</p>)}
            </Chat>

            <Chat pos="left" delay={1500} handleMessage={setMessageCounter}>
              <p>
                What about their <span style={{fontWeight: "bold"}}>food quality</span>?
              </p>
            </Chat>
            <Rating finished={secondRatingFinished} handleClick={handleSecondRatingClick} currentRating={secondRating} setCurrentRating={setSecondRating} delay={2000} />
          </>
        }

        {secondRatingFinished && 
          <>
            <Chat pos="right" delay={250} handleMessage={setMessageCounter}>
              <p>
                {secondRating} at best.
              </p>
            </Chat>

            <Chat pos={"left"} delay={750} handleMessage={setMessageCounter}>
              <div className="chart-container">
                <LineChart mfs={[rancid_mf, mediocre_mf, delicious_mf]} mfsLabels={foodQualityLabels} rating={secondRating} title={"Food Quality"} />
              </div>
            </Chat>


            <Chat pos={"left"} delay={1250} handleMessage={setMessageCounter}>
              <p>Here's the fuzzified values of their food quality:</p>              
              {fuzzifiedFoodRating.map((mf, idx) => <p key={idx}> <span style={{fontWeight: "bold"}}>{foodQualityLabels[idx]}:</span> {mf}</p>)}
            </Chat>


            <Chat pos="left" delay={1500} handleMessage={setMessageCounter}>
              <p>Let me apply the rules for these fuzzified values.</p>
            </Chat>


            <Chat pos={"left"} delay={2500} handleMessage={setMessageCounter}>
              <div className="chart-container">
                <BarChart data={appliedRules} labels={z} />
              </div>
            </Chat>


            <Chat pos="left" delay={3250} handleMessage={setMessageCounter}>
              <p>For getting the weighted average, the following weights will be multiplied to its corresponding fuzzified values:</p>
              {  
              appliedRules.map((rule, idx) => {
                  return (
                      <p key={idx}>
                        Rule {[idx+1]}: {z[idx]} × {rule} = <span style={{fontWeight: "bold"}}>{rule*z[idx]}</span>
                      </p>
                  )
                })
              }
            </Chat>


            <Chat pos="left" delay={4000} handleMessage={setMessageCounter}>
              <p>The weighted average is <span style={{fontWeight: "bold"}}>{weightedAverage}</span>.</p>  
            </Chat>


            <Chat pos={"left"} delay={4500} handleMessage={setMessageCounter}>
              <p>You can give a <span style={{fontWeight: "bold"}}>{weightedAverage*100}% tip</span> for 
              the restaurant's overall service <span style={{fontWeight: "bold"}}>({firstRating} ⭐)</span> and food quality <span style={{fontWeight: "bold"}}>({secondRating} ⭐)</span>.</p>
            </Chat>

            
            <Chat pos="left" delay={5000} handleMessage={setMessageCounter}>
              <p>Hope it helps!</p>
            </Chat>

            {delayInvoke(() => setCalcFinished(true), 5200)}

          </>
        }

        {
          calcFinished && <Button content={"Rerun"} delay={0} handleUpdate={setMessageCounter} onClick={rerunApp} />
        }

      </div>
    </div>
  )
}

export default App