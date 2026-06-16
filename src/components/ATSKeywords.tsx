import type { ATSKeywords as ATSKeywordsType } from '@/types';
import { CheckCircle, XCircle, Search } from 'lucide-react';

interface ATSKeywordsProps {
  keywords: ATSKeywordsType;
}

export function ATSKeywords({ keywords }: ATSKeywordsProps) {
  const coverage = Math.round(keywords.coverage || 0);

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
          <Search className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800">ATS Keyword Analysis</h3>
          <p className="text-xs text-slate-500">Applicant Tracking System compatibility</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{coverage}%</div>
          <p className="text-xs text-slate-500">Coverage</p>
        </div>
      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            coverage >= 70
              ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
              : coverage >= 40
              ? 'bg-gradient-to-r from-amber-400 to-amber-500'
              : 'bg-gradient-to-r from-red-400 to-red-500'
          }`}
          style={{ width: `${coverage}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/60">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-medium text-emerald-700">
              Matched ({keywords.matched.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keywords.matched.length > 0 ? (
              keywords.matched.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-white rounded-lg border border-emerald-200"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-xs text-emerald-600 italic">No keywords matched</p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-red-50 border border-red-200/60">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-500" />
            <h4 className="text-sm font-medium text-red-700">
              Missing ({keywords.missing.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {keywords.missing.length > 0 ? (
              keywords.missing.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium text-red-700 bg-white rounded-lg border border-red-200"
                >
                  {keyword}
                </span>
              ))
            ) : (
              <p className="text-xs text-red-600 italic">All important keywords found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
