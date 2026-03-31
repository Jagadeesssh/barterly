import { useState, useEffect } from 'react';
import { Search, PlusCircle, User, Repeat, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster, toast } from 'react-hot-toast';
import { SAMPLE_PRODUCTS, Product, Swap, Conversation, Message } from './data';
import { cn } from './utils/cn';
import Login from './pages/login'; // ✅ Import Login
import ListItemModal from './components/ListItemModal';
import ProductDetail from './components/ProductDetail';
import MessagesView from './components/MessagesView';
import ProfileModal from './components/ProfileModal';
import AIHelpWidget from './components/AIHelpWidget';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Explore');
  const [isLoginOpen, setIsLoginOpen] = useState(false); // ✅ Login state
  const [mySwaps, setMySwaps] = useState<Swap[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [prodRes, swapRes, convRes] = await Promise.all([
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/swaps`),
          fetch(`${API_URL}/api/conversations`)
        ]);
        
        if (prodRes.ok) setProducts(await prodRes.json());
        if (swapRes.ok) setMySwaps(await swapRes.json());
        if (convRes.ok) setConversations(await convRes.json());
      } catch (err) {
        toast.error("Failed to load data from database.");
        console.error("Fetch DB error:", err);
        setProducts(SAMPLE_PRODUCTS); // fallback for demo
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSaveProduct = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedProductIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const sendChatMessage = async (conversationId: string | null, productId: string, owner: string, text: string) => {
    const msgId = Math.random().toString(36).substr(2, 9);
    let convIdToUse = conversationId || Math.random().toString(36).substr(2, 9);

    const newMsg: Message = {
      id: msgId,
      sender: "You",
      text,
      timestamp: new Date().toISOString()
    };

    try {
      // Send User Message to DB
      const res = await fetch(`${API_URL}/api/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: convIdToUse,
          productId,
          owner,
          msg: newMsg
        })
      });
      
      if (!res.ok) throw new Error('Failed to send');
      const updatedConv = await res.json();
      
      setConversations(prev => {
        const nextState = [...prev];
        const idx = nextState.findIndex(c => c.id === convIdToUse);
        if (idx >= 0) nextState[idx] = updatedConv;
        else nextState.unshift(updatedConv);
        return nextState;
      });

      if (!conversationId) { 
        setSelectedProduct(null);
        setActiveTab('Messages');
      }

    } catch (err) {
      toast.error("Failed to send message.");
      console.error(err);
    }
  };

  const handleOfferSwap = async (product: Product) => {
    const toastId = toast.loading('Sending swap offer...');
    const newSwap = {
      id: Math.random().toString(36).substring(7),
      product,
      status: 'Pending',
      dateOffered: new Date().toLocaleDateString(),
    };

    try {
      const res = await fetch(`${API_URL}/api/swaps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSwap)
      });
      if (!res.ok) throw new Error('Failed to send offer');
      
      const savedSwap = await res.json();
      setMySwaps([...mySwaps, savedSwap]);
      toast.success(`Swap offered for ${product.title}!`, { id: toastId });
    } catch (err) {
      toast.error('Failed to send swap offer.', { id: toastId });
      console.error(err);
    }
  };

  const handleListProduct = async (product: Product) => {
    const toastId = toast.loading('Saving listing to database...');
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error('Failed to save product');

      const savedProduct = await res.json();
      setProducts(prev => [savedProduct, ...prev]);
      toast.success('Listing posted perfectly!', { id: toastId });
    } catch (err) {
      toast.error('Could not save listing to database.', { id: toastId });
      console.error("Save DB error:", err);
    }
  };

  const handleDeleteProduct = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setProducts(prev => prev.filter(p => (p.id || p._id) !== id));
      toast.success('Listing deleted!');
    } catch (err) {
      toast.error('Could not delete listing.');
      console.error(err);
    }
  };

  const handleCancelSwap = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/swaps/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to cancel swap');
      setMySwaps(prev => prev.filter(s => s.id !== id));
      toast.success('Swap offer cancelled.');
    } catch (err) {
      toast.error('Could not cancel offer.');
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Electronics', 'Fashion', 'Music', 'Home', 'Sports', 'Bed', 'Lights', 'Kitchen', 'Mobiles', 'Laptop', 'Bags', 'Travel'];

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-300", isDarkMode ? "dark bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900")}>
      <Toaster position="top-center" toastOptions={{ className: 'font-semibold rounded-2xl shadow-xl' }} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Repeat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Barterly
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Explore', 'My Swaps', 'Messages', 'Saved'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-indigo-600",
                    activeTab === item ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
                  )}
                >
                  {t(`nav.${item.toLowerCase().replace(' ', '_')}`)}
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setIsListModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                {t('hero.list_item_btn')}
              </button>

              {/* ✅ LOGIN BUTTON & SETTINGS DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => isLoggedIn ? setIsSettingsOpen(true) : setIsLoginOpen(true)}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center cursor-pointer border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all overflow-hidden"
                >
                  <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight"
          >
            {t('hero.title_1')} <span className="text-indigo-600 dark:text-indigo-400">{t('hero.title_2')}</span><br />
            {t('hero.title_3')} <span className="text-violet-600 dark:text-violet-400">{t('hero.title_4')}</span>
          </motion.h1>

          <div className="max-w-2xl mx-auto relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('hero.search_placeholder')}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {activeTab === 'Explore' && (
          <>
            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                    category === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 border border-slate-200"
                  )}
                >
                  {t(`categories.${cat.toLowerCase()}`)}
                </button>
              ))}
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id || product._id} 
                  className="bg-white dark:bg-slate-800 dark:border-slate-700 rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 h-40 w-full bg-slate-100 dark:bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => toggleSaveProduct(product.id, e)}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
                    >
                      <Heart 
                        className={cn("w-5 h-5 transition-colors", savedProductIds.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-400")} 
                      />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg dark:text-white">{product.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{product.description}</p>

                  {(product.price || product.yearsOld) && (
                    <div className="flex gap-2 mb-4">
                      {product.price && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-md font-semibold">${product.price} Value</span>}
                      {product.yearsOld && <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-md font-semibold">{product.yearsOld}y old</span>}
                    </div>
                  )}

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOfferSwap(product); }}
                    className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all relative z-10"
                  >
                    {t('app.offer_swap')}
                  </button>
                </div>
              ))}
            </div>
            )}
          </>
        )}

        {activeTab === 'My Swaps' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 dark:border-slate-700 rounded-2xl shadow-sm border p-6 transition-colors">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('app.offers_sent')}</h2>
              {mySwaps.length === 0 ? (
                <p className="text-slate-500 text-center py-10">{t('app.no_offers')}</p>
              ) : (
                <div className="space-y-4">
                  {mySwaps.map((swap) => (
                    <div key={swap.id} className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-700 p-4 rounded-xl border object-contain transition-colors">
                      <img src={swap.product.image} alt={swap.product.title} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold dark:text-white">{swap.product.title}</h4>
                        <p className="text-sm text-slate-500">{t('app.offered_to')} {swap.product.owner} {t('app.on')} {swap.dateOffered}</p>
                      </div>
                      <div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          swap.status === 'Pending' ? "bg-yellow-100 text-yellow-800" :
                          swap.status === 'Accepted' ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"
                        )}>
                          {swap.status}
                        </span>
                        <button onClick={() => handleCancelSwap(swap.id)} className="ml-3 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors">
                          {t('app.cancel')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 dark:border-slate-700 rounded-2xl shadow-sm border p-6 transition-colors">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('app.items_listed')}</h2>
              {products.filter(p => p.owner === (currentUser?.name || "You (Local User)")).length === 0 ? (
                <p className="text-slate-500 text-center py-10">{t('app.no_listings')}</p>
              ) : (
                <div className="space-y-4">
                  {products.filter(p => p.owner === (currentUser?.name || "You (Local User)")).map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-700 p-4 rounded-xl border object-contain transition-colors">
                      <img src={product.image} alt={product.title} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold dark:text-white">{product.title}</h4>
                        <p className="text-sm text-slate-500">{t('app.value')}: ${product.price || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {t('app.active_listing')}
                        </span>
                        <button onClick={() => handleDeleteProduct(product.id || product._id!)} className="ml-3 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors">
                          {t('app.delete')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Messages' && (
          <MessagesView 
            conversations={conversations} 
            products={products} 
            onSendMessage={(cid, text) => {
              const conv = conversations.find(c => c.id === cid);
              if (conv) sendChatMessage(cid, conv.productId, conv.owner, text);
            }} 
          />
        )}

        {activeTab === 'Saved' && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('app.saved_items')}</h2>
            {savedProductIds.length === 0 ? (
              <p className="text-slate-500 text-center py-10">{t('app.no_saved')}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => savedProductIds.includes(p.id)).map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4 h-40 w-full bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={(e) => toggleSaveProduct(product.id, e)}
                        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
                      >
                        <Heart 
                          className={cn("w-5 h-5 transition-colors", savedProductIds.includes(product.id) ? "fill-red-500 text-red-500" : "text-slate-400")} 
                        />
                      </button>
                    </div>
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{product.description}</p>

                    {(product.price || product.yearsOld) && (
                      <div className="flex gap-2 mb-4">
                        {product.price && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-md font-semibold">${product.price} {t('app.value')}</span>}
                        {product.yearsOld && <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-md font-semibold">{product.yearsOld}{t('app.years_old')}</span>}
                      </div>
                    )}

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleOfferSwap(product); }}
                      className="w-full bg-indigo-50 text-indigo-700 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-colors"
                    >
                      {t('app.offer_swap')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20 py-6 text-center text-sm text-slate-400">
        © 2025 Barterly. Built for a sustainable future.
      </footer>

      {/* ✅ LOGIN MODAL */}
      <AnimatePresence>
        {isLoginOpen && (
          <Login 
            onClose={() => setIsLoginOpen(false)} 
            onLogin={() => { setIsLoggedIn(true); setIsLoginOpen(false); toast.success("Logged in successfully!"); }}
          />
        )}
      </AnimatePresence>

      {/* ✅ LOGIN MODAL */}
      <AnimatePresence>
        {isLoginOpen && (
          <Login 
            onClose={() => setIsLoginOpen(false)} 
            onLogin={(user) => { 
              setCurrentUser(user); 
              setIsLoggedIn(true); 
              setIsLoginOpen(false); 
            }} 
          />
        )}
      </AnimatePresence>

      {/* ✅ LISTING MODAL */}
      <AnimatePresence>
        {isListModalOpen && (
          <ListItemModal 
            categories={categories}
            onClose={() => setIsListModalOpen(false)} 
            onList={handleListProduct} 
            ownerName={currentUser?.name || "You (Local User)"}
          />
        )}
      </AnimatePresence>

      {/* ✅ PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onSendMessage={(text) => sendChatMessage(null, selectedProduct.id, selectedProduct.owner, text)}
            isSaved={savedProductIds.includes(selectedProduct.id)}
            onToggleSave={() => toggleSaveProduct(selectedProduct.id)}
          />
        )}
      </AnimatePresence>

      {isSettingsOpen && isLoggedIn && (
        <ProfileModal 
          onClose={() => setIsSettingsOpen(false)}
          onLogout={() => { 
            localStorage.removeItem('token'); 
            localStorage.removeItem('user'); 
            setIsLoggedIn(false); 
            setCurrentUser(null); 
            setIsSettingsOpen(false); 
            toast.success("Logged out successfully."); 
          }}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          mySwaps={mySwaps}
          myProducts={products.filter(p => p.owner === (currentUser?.name || "You (Local User)"))}
          currentUser={currentUser}
        />
      )}

      <AIHelpWidget />
    </div>
  );
}
