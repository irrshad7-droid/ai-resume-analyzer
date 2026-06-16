import type { RedFlag as RedFlagType } from '@/types';
import { AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

interface RedFlagsProps {
  redFlags: RedFlagType[];
}

export function RedFlags({ redFlags }: RedFlagsProps) {
  if (!redFlags || redFlags.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-200/60 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Recruiter Concerns</h3>
            <p className="text-xs text-slate-500">Potential issues in your resume</p>
          </div>
        </div>
        <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">
          No major red flags detected. Great job!
        </p>
      </div>
    );
  }

  const severityConfig = {
    high: {
      icon: <AlertOctagon className="w-4 h-4" />,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      border: 'border-red-200',
      bg: 'bg-red-50',
    },
    medium: {
      icon: <AlertCircle className="w-4 h-4" />,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
      border: 'border-amber-200',
      bg: 'bg-amber-50',
    },
    low: {
      icon: <AlertTriangle className="w-4 h-4" />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      border: 'border-orange-200',
      bg: 'bg-orange-50',
    },
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-red-100 to-red-50 rounded-xl">
          <AlertOctagon className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Recruiter Concerns</h3>
          <p className="text-xs text-slate-500">Issues that may raise red flags with recruiters</p>
        </div>
      </div>

      <div className="space-y-3">
        {redFlags.map((flag, index) => {
          const severity = (flag.severity || 'medium') as 'high' | 'medium' | 'low';
          const config = severityConfig[severity];

          return (
            <div key={index} className={`p-4 rounded-xl border ${config.border} ${config.bg}`}>
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg ${config.iconBg} mt-0.5`}>
                  <span className={config.iconColor}>{config.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{flag.issue}</p>
                  <p className="text-xs text-slate-500 mt-1">{flag.whyItMatters}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.iconColor} ${config.iconBg}`}>
                  {severity}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
