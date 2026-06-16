import { useState, useEffect } from 'react';
import { History, Trash2, Eye, Clock, FileText, X } from 'lucide-react';
import type { AnalysisHistoryItem, ResumeAnalysis } from '@/types';

interface AnalysisHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnalysis: (analysis: ResumeAnalysis) => void;
}

const STORAGE_KEY = 'resume_analysis_history';

export function saveAnalysisToHistory(fileName: string, analysis: ResumeAnalysis) {
  const history = getAnalysisHistory();
  const newItem: AnalysisHistoryItem = {
    id: Date.now().toString(),
    fileName,
    analysis,
    date: new Date().toISOString(),
  };

  const updatedHistory = [newItem, ...history].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newItem;
}

export function getAnalysisHistory(): AnalysisHistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteAnalysisFromHistory(id: string) {
  const history = getAnalysisHistory();
  const updated = history.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearAnalysisHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function AnalysisHistory({ isOpen, onClose, onSelectAnalysis }: AnalysisHistoryProps) {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getAnalysisHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteAnalysisFromHistory(id);
    setHistory(getAnalysisHistory());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    if (score >= 40) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-50 rounded-lg">
              <History className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Analysis History</h2>
              <p className="text-sm text-slate-500">{history.length} previous analyses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No previous analyses found</p>
              <p className="text-sm text-slate-400">Upload a resume to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAnalysis(item.analysis);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/60 hover:border-primary-200 hover:bg-primary-50/30 cursor-pointer transition-all group"
                >
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <FileText className="w-5 h-5 text-slate-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700 truncate">{item.fileName}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(item.date)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-lg font-semibold ${getScoreColor(item.analysis.overallScore)}`}>
                      {item.analysis.overallScore}
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg font-semibold ${getScoreColor(item.analysis.atsScore)}`}>
                      ATS: {item.analysis.atsScore}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-primary-500 hover:bg-primary-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => {
                clearAnalysisHistory();
                setHistory([]);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
