import "./styles.css";
import { useState, useRef, useEffect } from "react";
export default function App() {
  // make an otp input like shadcn input otp - Done
  // it should only accept numbers - Done
  // each input box should only accept one number, that too last one - Done
  // On typing the first number the focus should move to next input
  // initial focus should be on first input - Done
  // on backspace input should focus on next input in reverse
  const inputCount = 6;
  const inputRefs = useRef([]);
  const [inputArr, setInputArr] = useState(new Array(inputCount).fill(""));
  const handleInput = (val, index) => {
    const newVal = val.trim();
    if (!isNaN(val)) {
      const newArr = [...inputArr];
      newArr[index] = val.slice(-1);
      setInputArr(newArr);
      newVal && inputRefs.current[index + 1]?.focus();
    } else return;
  };
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const handleBackspace = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleArrowKeyNavigation = (e, index) => {
    if (e.key === "ArrowRight") {
      // Move focus to the next input if possible
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === "ArrowLeft") {
      // Move focus to the previous input if possible
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {/* Step-1 six boxes should be there for otp but rewriting input tags
       is bad practice,
      so we need to make a generic reusable component */}
      {/* step-2 you need to find reference of each input box 
      and try to focus it */}
      {inputArr.map((input, index) => (
        <input
          key={index}
          style={{ width: "50px", height: "50px", margin: "5px" }}
          value={inputArr[index]}
          onChange={(e) => handleInput(e.target.value, index)}
          ref={(input) => (inputRefs.current[index] = input)} // Assign unique ref based on index
          onKeyDown={(e) => {
            handleBackspace(e, index); // Handle backspace
            handleArrowKeyNavigation(e, index); // Handle arrow key navigation
          }}
        />
      ))}
    </div>
  );
}
