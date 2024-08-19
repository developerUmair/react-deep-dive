import { useState } from "react";
import { messages } from "../data/data";
import "./steps.css";

const Steps = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  // const [test, setTest] = useState({name: 'Syed Umair'});
  const [noOfDays, setNoOfDays] = useState(0);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + Number(count));

  const handleAddDays = () => {
    setNoOfDays((prev) => prev + 1);
  };

  const handleRemoveDays = () => {
    setNoOfDays((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + Number(noOfDays));
  };

  const handleDecrement = () => {
    setCount((prev) => prev - Number(noOfDays));
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      // setTest({name: "CodeMyIdea"})
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleReset = () => {
    setNoOfDays(0);
    setCount(0);
  };

  return (
    <>
      {/* <button className="close"></button> */}
      <button className="close" onClick={handleToggle}>
        {isOpen ? "✖" : "☰"}
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}:{messages[step - 1]}
            {/* {test.name} */}
          </p>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div>
        <h1>Challenge</h1>
        {/* <button onClick={handleRemoveDays}>-</button> Step: {noOfDays}{" "} */}
        <input
          type="range"
          min={1}
          max={10}
          value={noOfDays}
          onChange={(e) => setNoOfDays(Number(e.target.value))}
        />{" "}
        {noOfDays}
        {/* <button onClick={handleAddDays}>+</button> */}
        <br />
        <button onClick={handleDecrement}>Minus</button>{" "}
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={handleIncrement}>Plus</button>
        <h2>
          {count > 0
            ? `${count} days from today is`
            : count < 0
            ? `${Math.abs(count)} days ago was`
            : "Today is"}{" "}
          {date.toDateString()}
        </h2>
        {noOfDays || count ? (
          <button onClick={handleReset}>Reset</button>
        ) : null}
      </div>
    </>
  );
};

export default Steps;
