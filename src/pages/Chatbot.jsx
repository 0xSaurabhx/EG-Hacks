import React, { useState } from 'react';
import './Chatbot.css'; // Assuming you have your custom CSS in App.css

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim() === '') return;
        
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const str_time = hour + ":" + minute;

        const newMessage = {
            text: inputText,
            time: str_time,
            isUser: true
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <div className="container">
            <div className="row padded_row">
                {/* Right side content */}
                <div className="col-md-7">
                    <div className="chat_window">
                        <div className="top_menu">
                            <div className="title">ChatBot - Jarvis</div>
                        </div>
                        <ul className="messages">
                            {messages.map((message, index) => (
                                <li key={index} className={message.isUser ? "message_user" : "message_bot"}>
                                    {message.text}
                                    <span className="time_date">{message.time}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bottom_wrapper">
                            <input 
                                id="msg_input" 
                                placeholder="Say Hi to begin chat..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <div id="send_button" className="app_button_1" onClick={sendMessage}>Send</div>
                        </div>
                    </div>
                </div>

                {/* Left side content */}
                <div className="col-md-5">
                    <div className="chat_window">
                        <div className="top_menu">
                            <div className="title">Help</div>
                        </div>
                        <div className="panel-group" id="accordion">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse1">Lorem ipsum</a>
                                    </h4>
                                </div>
                                <div id="collapse1" className="panel-collapse collapse in">
                                    <div className="panel-body">
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
