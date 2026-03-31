import { useState } from "react";
import { Send, User } from "lucide-react";
import { Conversation, Product } from "../data";
import { cn } from "../utils/cn";

type MessagesViewProps = {
  conversations: Conversation[];
  products: Product[];
  onSendMessage: (conversationId: string, text: string) => void;
};

export default function MessagesView({ conversations, products, onSendMessage }: MessagesViewProps) {
  const [activeConvId, setActiveConvId] = useState<string | null>(
    conversations.length > 0 ? conversations[0].id : null
  );
  const [draft, setDraft] = useState("");

  if (conversations.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border p-12 text-center max-w-2xl mx-auto my-10">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No Messages Yet</h2>
        <p className="text-slate-500 text-lg">
          When you message someone about an item, your conversations will appear here!
        </p>
      </div>
    );
  }

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const relatedProduct = products.find((p) => p.id === activeConv.productId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSendMessage(activeConv.id, draft);
    setDraft("");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border overflow-hidden flex h-[80vh] min-h-[600px] mb-10">
      
      {/* Sidebar: Conversation List */}
      <div className="w-1/3 border-r border-slate-100 bg-slate-50 flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h2 className="text-2xl font-extrabold text-slate-900">Inbox</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => {
            const product = products.find(p => p.id === conv.productId);
            const lastMessage = conv.messages[conv.messages.length - 1];
            const isActive = conv.id === activeConvId;
            
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={cn(
                  "w-full text-left p-4 border-b border-slate-100 transition-colors flex gap-4 hover:bg-indigo-50/50",
                  isActive ? "bg-indigo-50 border-l-4 border-l-indigo-600" : "bg-white border-l-4 border-l-transparent"
                )}
              >
                <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0 overflow-hidden">
                  {product?.image ? (
                    <img src={product.image} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><User className="w-6 h-6 text-slate-400"/></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900 truncate">{conv.owner}</h4>
                    <span className="text-xs text-slate-400 shrink-0">{new Date(conv.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-xs text-indigo-600 font-semibold truncate mb-1 border border-indigo-100 bg-indigo-50/50 inline-block px-2 py-0.5 rounded-full">
                    Re: {product?.title || 'Unknown Item'}
                  </p>
                  <p className="text-sm text-slate-500 truncate">{lastMessage?.text || 'No messages yet'}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col bg-white relative">
        
        {/* Chat Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-white shadow-sm z-10 relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 font-bold text-xl rounded-full flex items-center justify-center">
              {activeConv.owner.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">{activeConv.owner}</h3>
              <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Online
              </p>
            </div>
          </div>
          {relatedProduct && (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2 pr-4 rounded-xl">
              <img src={relatedProduct.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Trading</p>
                <p className="text-sm font-semibold truncate max-w-[150px]">{relatedProduct.title}</p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 space-y-6">
          {activeConv.messages.map((msg) => {
            const isMe = msg.sender === "You";
            return (
              <div key={msg.id} className={cn("flex flex-col max-w-[75%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}>
                <div 
                  className={cn(
                    "px-5 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed",
                    isMe 
                      ? "bg-indigo-600 text-white rounded-tr-sm" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-slate-400 mt-1.5 font-medium px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full pl-6 pr-14 py-4 bg-slate-100/80 border border-slate-200 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder-slate-500"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button 
              type="submit"
              className={cn(
                "absolute right-2 w-10 h-10 flex items-center justify-center rounded-full transition-all text-white shadow-sm",
                draft.trim() ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-105" : "bg-slate-300 cursor-not-allowed"
              )}
              disabled={!draft.trim()}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
