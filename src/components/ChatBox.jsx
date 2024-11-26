import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const socket = io("http://localhost:3000");

  const handleConnect = () => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
  };

  useEffect(() => {
    handleConnect();

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    setMessage("");

    socket.emit("message", {
      user: JSON.parse(localStorage.getItem("user")).name,
      userId: JSON.parse(localStorage.getItem("user")).id,
      message,
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <p key={index} className="message">
              {message.user}: {message.message}
            </p>
          ))}
          <p className={isConnected ? "message" : "message-disconnected"}>
            {isConnected ? "Conectado" : "Desconectado"}
          </p>
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
