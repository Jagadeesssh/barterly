import { useState } from "react";
import { X, Send, User, Heart } from "lucide-react";
import { Product } from "../data";
import { cn } from "../utils/cn";

type ProductDetailProps = {
  product: Product;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  isSaved: boolean;
  onToggleSave: () => void;
};

export default function ProductDetail({ product, onClose, onSendMessage, isSaved, onToggleSave }: ProductDetailProps) {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage(""); // Clear input
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 md:p-6 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative my-8 overflow-hidden flex flex-col md:flex-row">
        
        {/* Close Button Top Right (Mobile/Desktop) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Huge Image */}
        <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-100">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Right Side: Details & Messaging */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col max-h-[85vh] overflow-y-auto">
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
              {product.condition}
            </span>
            {product.price && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                ${product.price} Value
              </span>
            )}
            {product.yearsOld && (
              <span className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                {product.yearsOld}y old
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{product.title}</h2>
            <button
              onClick={onToggleSave}
              className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors shrink-0"
            >
              <Heart 
                className={cn("w-6 h-6 transition-colors", isSaved ? "fill-red-500 text-red-500" : "text-slate-400")} 
              />
            </button>
          </div>
          
          {/* Owner Info block */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 bg-indigo-200 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg">
              {product.owner.charAt(0)}
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Listed by</p>
              <p className="font-bold text-slate-900">{product.owner}</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-slate mb-8">
            <h3 className="text-lg font-bold">About this item</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          {/* Spacer to push messaging to the bottom if content is short */}
          <div className="flex-1"></div>

          {/* Messaging Area */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Send {product.owner} a message
            </h3>
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                placeholder="Hi, I'm interested in trading..."
                className="w-full pl-4 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder-slate-400 font-medium"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit"
                className={cn(
                  "absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-xl transition-all shadow-sm",
                  message.trim() ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Messaging is safe and secure.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
