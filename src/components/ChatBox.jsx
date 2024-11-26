import { useEffect, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";

const ChatBox = () => {
  const [message, setMessage] = useState(""); // Estado para el mensaje
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const handleSendMessage = () => {
    setMessage(""); // Limpiar el campo de texto

    socket.emit("message", {
      user: JSON.parse(localStorage.getItem("user")).name,
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
          {/* Aquí puedes renderizar mensajes (puedes agregar lógica dinámica) */}
          <p className={isConnected ? "message" : "message-disconnected"}>
            {isConnected ? "Conectado" : "Desconectado"}
          </p>
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
