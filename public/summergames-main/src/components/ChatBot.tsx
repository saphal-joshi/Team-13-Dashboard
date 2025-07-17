import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, AlertCircle } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [awsError, setAwsError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lexClient = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeAWS();
    }
  }, [isOpen, isInitialized]);

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
          accessKeyId: 'ASIA27PR364I6R6W2T5U',
          secretAccessKey: '3yU+1LmI3MHJVfkjY8PegSKKjmXaowSt+nR8rH80',
          sessionToken: 'IQoJb3JpZ2luX2VjEGEaCXVzLWVhc3QtMSJHMEUCIFBZTluBS5cS+9/wOacWZqHNhz3IBC38gYQAwL5UMPSsAiEAyIbkvs484OTdrEuDibid5rK4kR38OgXQbgeWmyfw06oq+QIIehAAGgw3NTQ4MTA4Nzc3MTMiDE4pj+vY2eaVs1A5iirWAmdH+Ig2RzREjLmT6hH5a+cc3cQ5gmAeDiEsrnGJbtTH3Doa/0jr2flZAxNEQwNnTPCjh7XAmNdkM7R50wE05hPQr2B2WU2ldpfbFuqU4UOAO5aOP9m0JH8uBBVCP/axzvwUPqcwlMqdzxqpWghsakU4D/7ZDnZ+Tq5/dVW7ZeU5bbmm1i+a+pMMQV3JePu9tXn5ZFxkd18oHDjUwSnPHk/zTvyavNTHRXoBglpfJov+zDAFlr6byaEKZWW0QpdnY2igpbz5HKru/suQjDjJe9a3CUSDmeP9RQV8AVz1JVJa/A8qKU74VyCFr0qAjpggpSJ0nrv3ii359SoSJPSEWGIq7ngyebi+KyCKBcN71fjBY6GW3O7/Gp20amU7tvTNeSj5r7tsy8zYFFjah8P/qDMW/OQiOKNjwd+XYB0Izqwl5EubGcnOdO3E5gnkieNvGCdmrRcBozCrz+TDBjqnATNEPkAVox+WRvqv79Or13AUjLRj3jEJ7EePM4aJZBSR2RK6JbtqBkghOog3g9wtViZt3cYdaRnaxHt6FguZFLZhQYdTS08/CbtbD3Eb5y8k3API0lwu6wScaaQ9D1ZTprruaF0mGaeewjPfSEm8NQOnfd0Zc5vZGLrJh9oTjUXImOz1wj5u/Wj4qRxHJ+BpOu76UWmed69AYhbvsoibK5vXMztaMJCB'
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

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Backdrop Blur Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Chat Window - Full Screen Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
          <div className="w-full max-w-2xl h-[80vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col pointer-events-auto animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">ASK-B Bot</h3>
                  <p className="text-blue-100 text-sm">Your intelligent assistant</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {!isInitialized && (
                <div className="flex items-center mt-4 text-yellow-200 text-sm">
                  <AlertCircle size={16} className="mr-2" />
                  Initializing connection...
                </div>
              )}
              {awsError && (
                <div className="flex items-center mt-4 text-yellow-200 text-sm">
                  <AlertCircle size={16} className="mr-2" />
                  Connection issue detected
                </div>
              )}
            </div>

            {/* Error Banner */}
            {awsError && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                  <p className="text-sm text-red-700">{awsError}</p>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-scroll">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-600 text-lg mb-2">👋 Welcome to ASK-B Bot!</div>
                  <div className="text-gray-500">I'm here to help you with any questions you might have.</div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl text-sm ${
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
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl text-sm shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-6 bg-gray-50/80 rounded-b-2xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white shadow-sm"
                  disabled={isLoading || !isInitialized}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim() || !isInitialized}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
