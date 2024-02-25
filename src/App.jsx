import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8) // Corrected variable name
  const [numAllowed, setNumAllowed] = useState(false)
  const [useChar, setUseChar] = useState(false) // Corrected function name
  const [password, setPassword] = useState("") // Corrected function name

  const copyPassToCB = useCallback(() =>{
    window.navigator.clipboard.writeText(password)
  } , [password])

  const passwordRef = useRef(null)



  const passwordGen = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numAllowed) str += "0123456789"
    if (useChar) str += "!@#$%^&*(){}:<>"

    let pass = ""; // Declare pass variable
    for (let i = 1; i <= length; i++) { // Changed the condition to <=
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, useChar, setPassword])

  useEffect(() => {
    passwordGen()
  }, [length, numAllowed, useChar, passwordGen]) // Removed setpassword from the dependency array

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 text-yellow-600 bg-gray-900'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <h1 className='text-white text-center bg-blue-400'>Password Generator</h1>
          <input
            type="text"
            value={password}
            placeholder='password'
            className='outline-none w-full py-1 px-3'
            readOnly
            ref = {passwordRef}
          />
          <button onClick={copyPassToCB} className='outline-none bg-blue-400 text-white px-3 py-0.5'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label >length:{length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={useChar}
              id="CharInput"
              onChange={() => {
                setUseChar((prev) => !prev); // Corrected function name
              }}
            />
            <label htmlFor="CharInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
