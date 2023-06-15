import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({ socket, Room, Username }) {
  const [Message, setMessage] = useState("");
  const [MessgeList, setMessgeList] = useState([]);
  useEffect(() => {
    socket.off("recieve_message").on(
      "recieve_message",
      (data) => {
        setMessgeList((list) => [...list, data]);

        console.log(MessgeList);
      },
      [socket]
    );
  }, [socket]);
  const sendMessage = async () => {
    if (Message !== "") {
      const Details = {
        author: Username,
        room: Room,
        text: Message,
        time: Date.now(),
      };
      await socket.emit("send_message", Details);
      setMessgeList((list) => [...list, Details]);
      setMessage("");
    }
  };
  return (
    <div className="h-screen lg:w-2/3  lg:ml-[250px]  bg-slate-200   p-2 ">
      <ScrollToBottom>
        <div className=" min-h-[655px]  flex flex-col  ">
          {MessgeList.map((message, key) => {
            return (
              <>
                <div
                  className={
                    message.author === Username
                      ? "flex justify-end mr-5"
                      : "flex jsutify-start  "
                  }
                  key={key}
                >
                 
                  <p className="text-white px-4 py-1 border-2 rounded-xl bg-blue-700 ">
                    {message.text}
                  </p>
                </div>
                <div
                  className={
                    message.author === Username
                      ? "flex   justify-end mb-3"
                      : "flex mb-3 justify-start ml-[10px] "
                  }
                > {message.author === Username ? (
                  ""
                ) : (
                  <p className="text-amber-900 py-1">{message.author}</p>
                )}
                 
                  <p className="mx-6 py-1">{format(message.time)}</p>
                </div>
              </>
            );
          })}
        </div>
      </ScrollToBottom>

      <div className="flex   ">
        <input
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="p-3 w-full rounded-xl"
          type="text"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here...."
        />
        <button
          className=" ml-2 p-3 bg-green-600 rounded-xl"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
