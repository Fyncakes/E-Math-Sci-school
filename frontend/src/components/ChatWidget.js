import React, { useState } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your learning assistant. How can I help you navigate our website today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(inputMessage),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('program') || lowerMessage.includes('course')) {
      return "Great! You can explore our programs by clicking on 'Programs' in the navigation menu. We offer Elementary Math, Middle School STEM, and High School Advanced courses!";
    } else if (lowerMessage.includes('admission') || lowerMessage.includes('apply')) {
      return "To apply, go to the 'Admissions' page where you'll find our step-by-step application process, requirements, and fee information.";
    } else if (lowerMessage.includes('login') || lowerMessage.includes('portal')) {
      return "You can access the Student Portal by clicking 'Student Portal' in the navigation. If you don't have an account, click 'Register' to create one!";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "You can find our contact information on the 'Contact' page, including our phone number, email, and address. We're here to help!";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('navigate')) {
      return "I'm here to help! You can navigate using the menu at the top. Try exploring Programs, Admissions, or the Student Portal. What would you like to know more about?";
    } else {
      return "Thanks for your message! I'm here to help you navigate our website. You can ask me about programs, admissions, student portal, or contact information. What would you like to know?";
    }
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>Learning Assistant</h4>
            <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
          </div>
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about our school..."
              className="chat-input-field"
            />
            <button type="submit" className="chat-send-btn">Send</button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="chat-btn"
        title="Need help? Chat with our learning assistant!"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default ChatWidget;
