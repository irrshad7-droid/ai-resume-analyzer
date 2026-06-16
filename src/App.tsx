import { useState, useEffect } from 'react';
import {
  Header,
  FileUpload,
  AnalysisDashboard,
  SettingsModal,
  AnalysisHistory,
  saveAnalysisToHistory,
} from '@/components';
import { useResumeProcessor } from '@/hooks';
import { hasApiKey as checkHasApiKey } from '@/services/gemini';
import { downloadAnalysisPDF } from '@/services/pdfExport';
import type { ResumeAnalysis } from '@/types';
import { RefreshCw, Sparkles, AlertCircle, FileSearch, Target, Brain, Shield } from 'lucide-react';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysis | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);

  const { status, analysis, error, uploadedFileName, processResume, reset } =
    useResumeProcessor();

  useEffect(() => {
    setHasApiKey(checkHasApiKey());
  }, []);

  useEffect(() => {
    if (analysis && status === 'complete') {
      setCurrentAnalysis(analysis);
      if (uploadedFileName) {
        setCurrentFileName(uploadedFileName);
        saveAnalysisToHistory(uploadedFileName, analysis);
      }
    }
  }, [analysis, status, uploadedFileName]);

  const handleKeyChange = (key: string | null) => {
    setHasApiKey(!!key);
  };

  const handleSelectHistory = (historyAnalysis: ResumeAnalysis) => {
    setCurrentAnalysis(historyAnalysis);
  };

  const handleReset = () => {
    reset();
    setCurrentAnalysis(null);
    setCurrentFileName(null);
  };

  const handleDownloadPDF = () => {
    if (currentAnalysis && currentFileName) {
      downloadAnalysisPDF(currentAnalysis, currentFileName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onSettingsClick={() => setSettingsOpen(true)}
        onHistoryClick={() => setHistoryOpen(true)}
        hasApiKey={hasApiKey}
      />

      {!hasApiKey && (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">API Key Required:</span> Configure your Gemini API key in{' '}
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="font-semibold text-amber-600 hover:text-amber-700 underline underline-offset-2"
                >
                  Settings
                </button>
                {' '}to enable resume analysis
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentAnalysis ? (
          <div className="space-y-6">
            <AnalysisDashboard
              analysis={currentAnalysis}
              onDownloadPDF={handleDownloadPDF}
            />
            <div className="flex justify-center pt-6">
              <button
                onClick={handleReset}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-primary-600 bg-white border-2 border-primary-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all shadow-sm hover:shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                Analyze Another Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 blur-3xl rounded-full" />

              <div className="relative text-center py-12 sm:py-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full border border-primary-200 mb-6 shadow-sm">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-primary-700">AI-Powered Resume Analysis</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-5 leading-tight">
                  Transform Your Resume
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
                    Into Opportunities
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Get realistic scoring, ATS keyword analysis, detailed project evaluation,
                  and a 90-day improvement plan to boost your placement chances.
                </p>

                <FileUpload
                  onFileSelect={hasApiKey ? processResume : () => setSettingsOpen(true)}
                  status={hasApiKey ? status : 'idle'}
                  uploadedFileName={uploadedFileName}
                  error={hasApiKey ? error : null}
                />
              </div>
            </div>

            <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl w-full">
              <FeatureCard
                icon={<FileSearch className="w-6 h-6 text-primary-500" />}
                title="Realistic Scoring"
                description="6-criteria breakdown with explainable scores. No inflated results."
                gradient="from-primary-50 to-white"
                iconBg="bg-primary-100"
              />
              <FeatureCard
                icon={<Target className="w-6 h-6 text-emerald-500" />}
                title="ATS Keywords"
                description="Matched and missing keywords analysis with coverage percentage."
                gradient="from-emerald-50 to-white"
                iconBg="bg-emerald-100"
              />
              <FeatureCard
                icon={<Brain className="w-6 h-6 text-amber-500" />}
                title="Interview Readiness"
                description="Frontend, backend, full-stack, and internship preparedness scores."
                gradient="from-amber-50 to-white"
                iconBg="bg-amber-100"
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-red-500" />}
                title="Red Flag Detection"
                description="Identify issues that may concern recruiters before you submit."
                gradient="from-red-50 to-white"
                iconBg="bg-red-100"
              />
            </div>

            <div className="mt-12 p-6 max-w-3xl w-full bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">What You'll Get</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-primary-600">6</p>
                  <p className="text-xs text-slate-500">Score Criteria</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-emerald-600">90</p>
                  <p className="text-xs text-slate-500">Day Roadmap</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-amber-600">4</p>
                  <p className="text-xs text-slate-500">Interview Scores</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <p className="text-2xl font-bold text-violet-600">PDF</p>
                  <p className="text-xs text-slate-500">Report Export</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-slate-600">
                Powered by Google Gemini AI
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Built for placement-ready portfolios - Realistic, transparent, actionable feedback
            </p>
          </div>
        </div>
      </footer>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onKeyChange={handleKeyChange}
      />

      <AnalysisHistory
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectAnalysis={handleSelectHistory}
      />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
}

function FeatureCard({ icon, title, description, gradient, iconBg }: FeatureCardProps) {
  return (
    <div className={`relative p-6 sm:p-8 rounded-2xl border border-slate-200/60 bg-gradient-to-br ${gradient} hover:shadow-xl hover:border-slate-300/60 transition-all duration-300 group overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/50 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />

      <div className={`relative inline-flex p-3 rounded-xl ${iconBg} shadow-sm mb-4`}>
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default App;
