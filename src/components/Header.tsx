import { FileSearch, Settings, CheckCircle, History } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onHistoryClick: () => void;
  hasApiKey: boolean;
}

export function Header({ onSettingsClick, onHistoryClick, hasApiKey }: HeaderProps) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/25">
              <FileSearch className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">AI Resume Analyzer</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Powered by Google Gemini</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasApiKey && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 mr-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">API Key Set</span>
              </div>
            )}

            <button
              onClick={onHistoryClick}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </button>

            <button
              onClick={onSettingsClick}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
