import { useState, useRef, useEffect } from 'react'
import './App.css'
function App() {
  const otpLength = 6;
  const inputRef = useRef([]);
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const handleTyping = (e, i) => {
    let val = e.target.value;
    const input = e.target;
    if (isNaN(val)) return;
    val = val.slice(-1);
    let copyOtp = [...otp];
    copyOtp[i] = val;
    setOtp(copyOtp)
    if (val && i < otpLength - 1) {
      inputRef.current[i + 1].focus();
    }
  }
  const runBefore = useRef(false);
  useEffect(() =>{
    if(runBefore.current) return;
    generateOTP(otpLength);
    runBefore.current = true;
  },[])
  const tabSpecial = (i) => {
    const input = inputRef.current[i];
    if (input) {
      input.setSelectionRange(1, 1);
    }
  };
  const keyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRef.current[i - 1].focus()
    } else {
      handleTyping(e, i)
    }
  }
  var otpRecieve = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("") === otpRecieve.current && otp.join("").length === otpLength) {
      alert("OTP successful varified " + otp.join(""));
      setOtp(new Array(otpLength).fill(""))
    } else {
      return;
    }

  }

  const generateOTP = (n) => {
    let min = Math.pow(10, n - 1);
    let max = Math.pow(10, n) - 1;
    otpRecieve.current = String(Math.floor(Math.random() * (max - min + 1)) + min);
    alert("your otp here, " + otpRecieve.current)
  }
  
  return (
    <div id='main'>
      <h1>OTP Varification</h1>
      <div className='user-number'><span className='contry-code'>+91</span><span className='Number'>8002190738</span><button type="submit" onClick={() => generateOTP(otpLength)} id='resend'>Resend</button></div>
      <form onSubmit={handleSubmit}>
        <div>
          {otp.map((e, i) => (
            <input type="text"
              key={i}
              ref={(ele) => inputRef.current[i] = ele}
              onKeyDown={(e) => keyDown(e, i)}
              onClick={() => tabSpecial(i)}
              onChange={(ele) => handleTyping(ele, i)}
              value={otp[i]} />
          ))}
        </div>
        <div id='btn'><button type='submit'>Varify</button></div>
      </form>
    </div>
  )
}
export default App
