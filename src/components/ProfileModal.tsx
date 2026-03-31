import { useState } from 'react';
import { X, Moon, Sun, Globe, LogOut, PackageSearch, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Swap, Product } from '../data';
import { cn } from '../utils/cn';

type ProfileModalProps = {
  onClose: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  mySwaps: Swap[];
  myProducts: Product[];
  currentUser: any;
};

export default function ProfileModal({ onClose, onLogout, isDarkMode, toggleDarkMode, mySwaps, myProducts, currentUser }: ProfileModalProps) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header Ribbon */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-violet-600 relative">
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full p-2 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-8 pb-8">
          
          {/* Avatar & Basic Info */}
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-xl flex items-center justify-center text-4xl font-extrabold uppercase">
                  {currentUser?.name?.charAt(0) || "U"}
                </div>
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-bold dark:text-white">{currentUser?.name || "Guest User"}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{currentUser?.email || "No email"}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={cn("pb-3 font-semibold text-sm transition-colors relative", activeTab === 'profile' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200")}
            >
              {t('profile.account_summary')}
              {activeTab === 'profile' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />}
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={cn("pb-3 font-semibold text-sm transition-colors relative", activeTab === 'preferences' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200")}
            >
              {t('profile.preferences')}
              {activeTab === 'preferences' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />}
            </button>
          </div>

          {/* Tab Content */}
          <div className="h-72 overflow-y-auto pr-2">
            
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in slide-in-from-right-2 fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl"><PackageSearch className="w-6 h-6" /></div>
                    <div>
                      <p className="text-2xl font-bold dark:text-white">{myProducts.length}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">{t('profile.live_listings')}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-xl"><History className="w-6 h-6" /></div>
                    <div>
                      <p className="text-2xl font-bold dark:text-white">{mySwaps.length}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">{t('profile.total_offers')}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Mini-Feed */}
                <div>
                  <h3 className="font-bold mb-3 dark:text-white">{t('profile.recent_activity')}</h3>
                  {mySwaps.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t('profile.no_activity')}</p>
                  ) : (
                    <div className="space-y-3">
                      {mySwaps.slice(0, 3).map(swap => (
                        <div key={swap.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
                           <img src={swap.product.image} className="w-10 h-10 rounded-lg object-cover bg-slate-200" alt="" />
                           <div className="flex-1">
                             <p className="text-sm font-semibold dark:text-white">Offered on {swap.product.title}</p>
                             <p className="text-xs text-slate-500 dark:text-slate-400">{swap.dateOffered} • Status: {swap.status}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in slide-in-from-left-2 fade-in">
                
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", isDarkMode ? "bg-indigo-900/50 text-indigo-400" : "bg-orange-100 text-orange-600")}>
                      {isDarkMode ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm dark:text-white">{t('profile.theme')}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('profile.theme_desc')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleDarkMode}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-sm font-semibold transition"
                  >
                    {isDarkMode ? t('profile.enable_light') : t('profile.enable_dark')}
                  </button>
                </div>

                {/* Language Select */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm dark:text-white">{t('profile.lang')}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('profile.lang_desc')}</p>
                    </div>
                  </div>
                  <select 
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 outline-none rounded-xl text-sm font-semibold cursor-pointer dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="fr">Français (French)</option>
                  </select>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl font-bold transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    {t('profile.logout')}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
