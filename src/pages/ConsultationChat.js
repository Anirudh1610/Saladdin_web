import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Phone, Video } from 'lucide-react';
import './ConsultationChat.css';

const ConsultationChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'nutritionist',
      name: 'Dr. Sarah Mitchell',
      text: 'Hello! Thanks for booking a consultation with me. How can I help you achieve your health goals today?',
      timestamp: '10:00 AM'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi! I\'m looking to lose weight and build muscle. Can you help me create a meal plan?',
      timestamp: '10:02 AM'
    },
    {
      id: 3,
      sender: 'nutritionist',
      name: 'Dr. Sarah Mitchell',
      text: 'Absolutely! I\'d love to help. To create the best plan for you, could you tell me: 1) Your current weight and height? 2) How active are you throughout the week? 3) Any dietary restrictions or allergies?',
      timestamp: '10:03 AM'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate nutritionist response
    setTimeout(() => {
      const autoResponse = {
        id: messages.length + 2,
        sender: 'nutritionist',
        name: 'Dr. Sarah Mitchell',
        text: 'Thank you for that information! Based on what you\'ve shared, I\'ll create a customized plan. Let me prepare some recommendations for you.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 2000);
  };

  return (
    <div className="chat-page">
      <div className="container">
        <div className="chat-container">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="nutritionist-info">
              <div className="avatar">👩‍⚕️</div>
              <div>
                <h3>Dr. Sarah Mitchell</h3>
                <span className="status online">● Online</span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="icon-btn" title="Voice Call">
                <Phone size={20} />
              </button>
              <button className="icon-btn" title="Video Call">
                <Video size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            <div className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'nutritionist-message'}`}
                >
                  {message.sender === 'nutritionist' && (
                    <div className="message-avatar">👩‍⚕️</div>
                  )}
                  <div className="message-content">
                    {message.sender === 'nutritionist' && (
                      <span className="message-name">{message.name}</span>
                    )}
                    <div className="message-bubble">
                      <p>{message.text}</p>
                    </div>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Responses */}
          <div className="quick-responses">
            <button
              className="quick-response-btn"
              onClick={() => setInputMessage('What should I eat pre-workout?')}
            >
              What should I eat pre-workout?
            </button>
            <button
              className="quick-response-btn"
              onClick={() => setInputMessage('Can you recommend high-protein meals?')}
            >
              Can you recommend high-protein meals?
            </button>
            <button
              className="quick-response-btn"
              onClick={() => setInputMessage('How much water should I drink daily?')}
            >
              How much water should I drink daily?
            </button>
          </div>

          {/* Chat Input */}
          <form className="chat-input" onSubmit={handleSendMessage}>
            <button type="button" className="attach-btn" title="Attach file">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className="send-btn" disabled={!inputMessage.trim()}>
              <Send size={20} />
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="chat-sidebar">
          <div className="sidebar-card card">
            <h3>Session Information</h3>
            <div className="session-info">
              <div className="info-row">
                <span>Type:</span>
                <strong>Nutritional Consultation</strong>
              </div>
              <div className="info-row">
                <span>Duration:</span>
                <strong>60 minutes</strong>
              </div>
              <div className="info-row">
                <span>Scheduled:</span>
                <strong>Jan 15, 2026 - 10:00 AM</strong>
              </div>
            </div>
          </div>

          <div className="sidebar-card card">
            <h3>Your Goals</h3>
            <ul className="goals-list">
              <li>🎯 Lose 15 pounds</li>
              <li>💪 Build lean muscle</li>
              <li>🥗 Learn meal prep</li>
              <li>⚡ Increase energy levels</li>
            </ul>
          </div>

          <div className="sidebar-card card">
            <h3>Resources</h3>
            <div className="resources-list">
              <a href="/" className="resource-link">📄 Meal Plan Template</a>
              <a href="/" className="resource-link">📊 Progress Tracker</a>
              <a href="/" className="resource-link">🍽️ Recipe Collection</a>
              <a href="/" className="resource-link">📈 Calorie Calculator</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationChat;
