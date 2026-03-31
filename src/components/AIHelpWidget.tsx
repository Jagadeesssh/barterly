import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { cn } from '../utils/cn';

export default function AIHelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; text: string; isBot: boolean }[]>([
    { id: 'start', text: 'Hi! I am the Barterly AI. How can I help you swap today?', isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI Intelligence
    setTimeout(() => {
      let reply = "I'm still learning! But you can contact support if you have account issues.";
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('list') || lower.includes('add') || lower.includes('post')) {
        reply = "To list an item, go to the 'Explore' tab and click the prominent 'List Item' plus button!";
      } else if (lower.includes('safe') || lower.includes('security')) {
        reply = "Barterly is highly secure. Swaps are agreed upon mutually, and your messages are encrypted.";
      } else if (lower.includes('language') || lower.includes('dark')) {
        reply = "You can change your language or toggle Dark Mode in your Profile Settings menu at the top right!";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), text: reply, isBot: true }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Widget Bubble Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white border-2 border-white/20"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Expanded Chat Interface */}
      {isOpen && (
        <div className="w-80 h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between text-white shadow-md z-10">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Barterly AI</h3>
                <p className="text-[10px] text-indigo-100 uppercase tracking-wider font-semibold">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Timeline */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex", msg.isBot ? "justify-start" : "justify-end")}>
                <div className={cn(
                  "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                  msg.isBot 
                    ? "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm"
                    : "bg-indigo-600 text-white rounded-tr-sm"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
            <button type="submit" disabled={!input.trim()} className="w-10 flex items-center justify-center shrink-0 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-300 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
