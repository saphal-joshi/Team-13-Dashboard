import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, AlertCircle, Minus } from 'lucide-react';

declare global {
  interface Window {
    AWS: any;
  }
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [awsError, setAwsError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });
  const [size, setSize] = useState({ width: 320, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const lexClient = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && !isInitialized) {
      initializeAWS();
    }
  }, [isExpanded, isInitialized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      const rect = chatbotRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y)),
        });
      } else if (isResizing) {
        const rect = chatbotRef.current?.getBoundingClientRect();
        if (rect) {
          setSize({
            width: Math.max(300, e.clientX - rect.left),
            height: Math.max(400, e.clientY - rect.top),
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, size]);

  const initializeAWS = () => {
    try {
      console.log('Initializing AWS...');
     
      const checkAWS = () => {
        if (!window.AWS) {
          console.log('AWS SDK not yet loaded, retrying...');
          setTimeout(checkAWS, 100);
          return;
        }

        console.log('AWS SDK loaded, configuring credentials...');
       
        // Configure AWS with the updated credentials
        window.AWS.config.region = 'us-east-1';
        window.AWS.config.credentials = new window.AWS.Credentials({
          accessKeyId: 'ASIA27PR364IWYH7UZ6Q',
          secretAccessKey: 'tUUiNvFmXvayoYli/HR3DFK+/OdPj9pDyZvZvjZk',
          sessionToken: 'IQoJb3JpZ2luX2VjEIP//////////wEaCXVzLWVhc3QtMSJIMEYCIQDRiltDW2c92WBJ94iR9abxl9jKoLND2lmtMwXY/tjCoQIhAKtFyf93NoXyhTGrLnwv0yR1ogaxjj8ZSzdrbgeJAgMsKoIDCKz//////////wEQABoMNzU0ODEwODc3NzEzIgwR9iUuX+87+dExsT8q1gLJgvlX19Dt5s6d54o/4FZ4Wlwp6gEGjiLK+cVITtqoxVXBpcqVq+/RhOTbhgKJGFUVtcGlOotJ89HFbcJAJ7GQZj3jd83m8lVjeVcpie4MJprHoTLvfUU+fzrrS5825cOogFq65zjJzXOqOHa5/HBeXGKikNCXL5LIdsemUVIyUe4ghBG8P/wzs4W3CudxoSTX4g26GwFHmcFGM3gqFc8TueKbWuWXVqfigCOmqG3d3ZtedbMvzgpqFJLdHJ/R/Tbningus4gKXEB685w8iO2QUwKOC/Html1lg3R5siLypfNuO8grTtYK+HoG8Iw0o5S/MGGV77xo7fUepOFFq4Rfdf8gZtEXjRFWon2b0Bim9i4etfrYd6TXcy1GP4vRtkqTmjFfTU9Lby9Yl0GbSyNkhzwpQK/s5mJi5JhMevbhv8bOl7n3A8esz9hnncp4ELC4Y3imAsIw2qWkxAY6pgFhE725EVfI0GT6oBR3a9mox8r2aJQcc8MchIG5a0UZXqlhcJg3SG0z/GWIdBO4S/g69DO9x9dzvIZNklOZlkf9ochrTDKrGOrwA8H+rBZ0PjrAqjuyykJw7/++8V+TUVDoXB+By8m+WRZkfQtKpO9rcFiunz93R2tdQU4mLxd8QAPK+hySCWDneXbUa46bHjv1XUmki4Zyra4iHCSNiaWbxNsDucZv'
        });

        console.log('Creating Lex client...');
        lexClient.current = new window.AWS.LexRuntimeV2();
        setAwsError(null);
        setIsInitialized(true);
        console.log('AWS Lex client initialized successfully');
      };

      checkAWS();
    } catch (error) {
      console.error('Failed to initialize AWS:', error);
      setAwsError('Failed to initialize AWS. Please check your credentials.');
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!lexClient.current || !isInitialized) {
      setAwsError('AWS Lex client not initialized. Please wait or refresh the page.');
      return;
    }

    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    setAwsError(null);

    try {
      const params = {
        botAliasId: 'XL3HUOOBXE',
        botId: 'J04J53KVTF',
        localeId: 'en_US',
        sessionId: 'user-session-' + Date.now(),
        text: currentInput
      };

      console.log('Sending request to Lex with params:', params);

      lexClient.current.recognizeText(params, (err: any, data: any) => {
        setIsLoading(false);
       
        if (err) {
          console.error('Lex Error:', err);
          let errorMessage = 'Sorry, I encountered an error.';
         
          if (err.code === 'UnrecognizedClientException') {
            errorMessage = 'Invalid AWS credentials. The session token may have expired.';
            setAwsError('AWS credentials are invalid or expired. Please update them.');
          } else if (err.code === 'AccessDeniedException') {
            errorMessage = 'Access denied. Please check your AWS permissions.';
            setAwsError('Access denied. Make sure your AWS user has Lex permissions.');
          } else if (err.message) {
            errorMessage = `Error: ${err.message}`;
            setAwsError(err.message);
          }

          const errorBotMessage: Message = {
            text: errorMessage,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorBotMessage]);
        } else {
          console.log('Lex Response:', data);
          const responseText = data.messages?.map((m: any) => m.content).join(' ') || 'No response';
          const botMessage: Message = {
            text: responseText,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending message:', error);
      setAwsError('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // UI from File #2 follows below — unchanged

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div
      ref={chatbotRef}
      className="fixed bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 flex flex-col"
      style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="drag-handle bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-t-2xl cursor-move flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={16} />
          <div>
            <h3 className="font-bold text-sm">ASK-B</h3>
            <p className="text-blue-100 text-xs">AI Security Knowledge Bot</p>
          </div>
        </div>
        <button onClick={() => setIsExpanded(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
          <Minus size={14} />
        </button>
      </div>

      {/* Status indicators */}
      {!isInitialized && (
        <div className="flex items-center px-4 py-2 text-yellow-600 text-xs bg-yellow-50">
          <AlertCircle size={12} className="mr-2" />
          Initializing connection...
        </div>
      )}
      {awsError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
            <p className="text-xs text-red-700">{awsError}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: size.height - 120 }}>
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-600 text-sm mb-1">👋 Welcome to ASK-B!</div>
            <div className="text-gray-500 text-xs">I'm here to help you with any question you have about compliance and regulations.</div>
          </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 shadow-md'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl text-xs shadow-md">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-gray-50/80 rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white shadow-sm text-xs"
            disabled={isLoading || !isInitialized}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim() || !isInitialized}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      >
        <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-blue-400"></div>
      </div>
    </div>
  );
};

export default ChatBot;
