import React, {  useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';

//const socket=io('https://kirmaani-api.onrender.com')
const socket=io('http://localhost:3001')

console.log(socket);
function Join() {
const [Username, setUsername] = useState('')
const [Room, setRoom] = useState('')
const [Live,setLive]=useState(false)
const handleSubmit=(e)=>{
e.preventDefault()
if(Username !=='' && Room !==''){
  socket.emit('join_room',Room)
  setLive(true)
}
}
    return (
     <div>{!Live ?   <div className='w-full h-screen flex  justify-center items-center  bg-slate-200 '>
 
<div className='flex flex-col rounded-lg  items-center border-2 border-slate-300 p-8'>
<input value={Username} onChange={(e)=>setUsername(e.target.value)} className='p-3 mt-3 rounded-full' type="text" placeholder='Enter your Username' />
<input value={Room}  onChange={(e)=>setRoom(e.target.value)}className='p-3 my-5 rounded-full' type="number" placeholder='Enter room Id' />
<button onClick={handleSubmit} className='w-16 py-2 hover:bg-blue-500 duration-1000 animate-pulse hover:text-white hover:animate-none mb-3 bg-green-500  rounded-full '>Join</button>
</div>
    </div>:
    <Chat socket={socket} Room={Room} Username={Username}/>}</div> 
  )
}

export default Join