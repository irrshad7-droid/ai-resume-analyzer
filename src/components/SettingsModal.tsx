import { useState, useEffect } from 'react';
import { X, Key, Eye, EyeOff, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';

export const STORAGE_KEY = 'gemini_api_key';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyChange: (key: string | null) => void;
}

export function SettingsModal({ isOpen, onClose, onKeyChange }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [_saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem(STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
      setSaved(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmedKey = apiKey.trim();

    if (!trimmedKey) {
      setError('Please enter an API key');
      return;
    }

    if (trimmedKey.length < 10) {
      setError('API key appears to be too short');
      return;
    }

    localStorage.setItem(STORAGE_KEY, trimmedKey);
    onKeyChange(trimmedKey);
    setSaved(true);
    setError(null);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleRemove = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey('');
    onKeyChange(null);
    setSaved(false);
    setError(null);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Key className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Settings</h2>
              <p className="text-sm text-slate-500">Configure your Gemini API key</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError(null);
                  setSaved(false);
                }}
                placeholder="Enter your Gemini API key"
                className="w-full px-4 py-3 pr-12 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Get your API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {_saved && (
            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-sm text-emerald-600">API key saved successfully</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-5 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleRemove}
            disabled={!localStorage.getItem(STORAGE_KEY)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <Trash2 className="w-4 h-4" />
            Remove Key
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getStoredApiKey(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function hasStoredApiKey(): boolean {
  return !!localStorage.getItem(STORAGE_KEY);
}
