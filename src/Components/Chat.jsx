import React, { useState } from 'react'
import { useEffect } from 'react'
import {format} from 'timeago.js'
import  ScrollToBottom from 'react-scroll-to-bottom'
function Chat({socket,Room,Username}) {
  const [Message, setMessage] = useState('')
  const [MessgeList, setMessgeList] = useState([])
  useEffect(() => {
    socket.on('recieve_message',(data)=>{
    
      setMessgeList(list=>[...list,data])
      console.log(MessgeList);
    })
    
   }, [socket,MessgeList])
   const sendMessage=async()=>{
   if(Message!==''){
    const Details={
      author:Username,
      room:Room,
      text:Message,
      time:Date.now()

    }
    await socket.emit('send_message',Details)
    setMessgeList(list=>[...list,Details])
    setMessage('')
  }
    
   }
  return (
    <div className='h-screen w-full  bg-slate-200    ' >
    
    <ScrollToBottom> <div className='h-96  '>
             {MessgeList.map((message,index)=>{
          return   <div className={message.author===Username?' flex items-start justify-start':'flex  flex-col items-end justify-end'} key={index}>     <p >{message.text}</p>
          <p>{format(message.time)}</p>
          <p className=''>{message.author}</p>
 </div>
 
        })}</div></ScrollToBottom>
     
      <div className='flex justify-center items-center'>
        <input type="text" value={Message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter your message' />
        <button onClick={sendMessage}>Send</button>
       
     
    </div></div>
  )
}

export default Chat