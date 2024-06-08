import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [Length, setLength] = useState(8)  //this is for length
  const [numAllowed, setnumAllowed]=useState(false) //this is for numbers
  const [charAllowed,setcharAllowed]=useState(false) //this is for character
  const[password, setpassword]=useState("")

  //useRef hook
  const passwordRef=useRef(null)
   
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str+="0123456789"
    if (charAllowed) str+="!@#$%^&*()_+=[]{}~`"
      
    for (let i = 1; i <=Length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)  //HERE WE ARE APPENDING THE CHARACTER
    }

    setpassword(pass)
    

  },[Length,numAllowed,charAllowed,setpassword])
  
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()   //?.option select
    passwordRef.current?.setSelectionRange(0,6)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
   
    passwordGenerator()
  },[Length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
    
      <div className='w-ful max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>password generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
         <input 
         type="text"
         value={password}
         className='outline-nonbe w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={passwordRef}
         />
         <button 
         onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 tert-white px-3 py-0.5 shrink-0'>copy</button>
       </div>

       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={Length}
          clasName='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} 
         />
         <label>Length:{Length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={()=>{
            setnumAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id="numberInput"
          onChange={()=>{
            setnumAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor='numberInput'>Charcaters</label>
        </div>
       </div>
      </div>
    </>
  )
}

export default App
/*
52:25 summarize


1. use Callback: used for optimization it calls the function inside it when the dependencies are changed and returns a memorized function 
2.useeffect: runs the function inside it whenever the page renders first-time or dependencies are changed
3.use ref : used to give reference of selected components in our page so that functions can be performed on referenced values
*/