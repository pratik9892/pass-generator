import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
  const [length , setLength] = useState(8);
  const [numAllowed , setNumAllowed ] = useState(false);
  const [charAllowed , setcharAllowed] = useState(false);
  const [password , setPassword] = useState("");
  const passwordRef = useRef(null) 
  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*~_+)("

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)
    }
    setPassword(pass)

  } , [length,numAllowed,charAllowed,setPassword]) 

  const copyPassToClip = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect( ()=>{
    passwordGenerater()
  },[length,numAllowed,charAllowed,passwordGenerater])

 

  return (
    <>
      <div className=" flex items-center justify-center w-full h-screen bg-gradient-to-r from-sky-400 to-cyan-300 ">
        <div className="sm:w-1/2 sm:h-[500px] backdrop-blur-xl bg-white/30  rounded-lg  flex px-8 justify-center flex-col gap-10 w-full h-[600px] mx-4 border-gray-600 border-2">
          <div className=' py-6'>
            <h1 className="md:text-4xl text-center uppercase text-black font-mono text-6xl">
              Password Generater
            </h1>
          </div>
          <div className='flex items-center justify-center px-4 py-6 bg-white rounded-xl border-gray-500 border-2'>
            <input 
            type="text"
            value={password}
            readOnly
            className='outline-none w-full px-6 py-3 rounded-md font-medium font-mono text-2xl'
            placeholder='Password'
            ref={passwordRef}
            />
            <button className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm sm:px-10 sm:py-4 py-2 px-6'
            
            onClick={copyPassToClip}
            >
              COPY
            </button>
          </div>
          <div className='flex items-center justify-between gap-10 flex-col sm:flex-row bg-white rounded-xl px-4 py-6 border-gray-500 border-2'>
            <div className='flex items-center gap-4'>
              <input 
              type="range"
              min={8}
              max={80}
              value={length}
              className=' h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer'
              onChange={ (e) => {setLength(e.target.value)}}
              />
              <label htmlFor=""
              className='uppercase font-mono font-medium'
              >Length : {length}</label>
            </div>
            <div className='flex items-center gap-4 '>
              <input 
              className='h-6 w-6'
              type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={ () => {
                setNumAllowed( (prev) => !prev)
              }}
              />
              <label htmlFor="numberInput"
              className='uppercase font-mono font-medium'
              >Numbers</label>
            </div>
            <div className='flex items-center gap-4 '>
              <input 
              className='h-6 w-6'
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={ () => {
                setcharAllowed( (prev) => !prev)
              }}
              />
              <label htmlFor="charInput"
              className='uppercase font-mono font-medium'
              >Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
