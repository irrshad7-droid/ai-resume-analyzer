import type { InterviewReadiness as InterviewReadinessType } from '@/types';
import { Monitor, Server, Layers, GraduationCap, BarChart3 } from 'lucide-react';

interface InterviewReadinessProps {
  readiness: InterviewReadinessType;
}

export function InterviewReadiness({ readiness }: InterviewReadinessProps) {
  const categories = [
    {
      name: 'Frontend',
      icon: <Monitor className="w-4 h-4" />,
      score: readiness.frontend,
      reason: readiness.frontendReason,
      color: 'primary',
    },
    {
      name: 'Backend',
      icon: <Server className="w-4 h-4" />,
      score: readiness.backend,
      reason: readiness.backendReason,
      color: 'emerald',
    },
    {
      name: 'Full-Stack',
      icon: <Layers className="w-4 h-4" />,
      score: readiness.fullstack,
      reason: readiness.fullstackReason,
      color: 'amber',
    },
    {
      name: 'Internship',
      icon: <GraduationCap className="w-4 h-4" />,
      score: readiness.internship,
      reason: readiness.internshipReason,
      color: 'violet',
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-violet-100 to-violet-50 rounded-xl">
          <BarChart3 className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Interview Readiness</h3>
          <p className="text-xs text-slate-500">Estimated preparedness for different roles</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-2xl font-bold text-violet-600">{readiness.overall}%</div>
          <p className="text-xs text-slate-500">Overall</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const colorClasses = getReadinessColor(category.color);
          const score = Math.round(category.score);

          return (
            <div key={index} className={`p-4 rounded-xl ${colorClasses.bg} border ${colorClasses.border}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg ${colorClasses.iconBg}`}>
                  <span className={colorClasses.iconColor}>{category.icon}</span>
                </div>
                <span className="text-sm font-medium text-slate-700">{category.name}</span>
              </div>

              <div className="flex items-center justify-center mb-2">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-slate-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 35}
                      strokeDashoffset={2 * Math.PI * 35 * (1 - score / 100)}
                      className={`stroke-current ${colorClasses.textColor} transition-all duration-700`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-lg font-bold ${colorClasses.textColor}`}>{score}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center leading-relaxed">{category.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getReadinessColor(color: string) {
  const colors: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; textColor: string }> = {
    primary: {
      bg: 'bg-primary-50/50',
      border: 'border-primary-200/60',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-500',
      textColor: 'text-primary-600',
    },
    emerald: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200/60',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-500',
      textColor: 'text-emerald-600',
    },
    amber: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-200/60',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
      textColor: 'text-amber-600',
    },
    violet: {
      bg: 'bg-violet-50/50',
      border: 'border-violet-200/60',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-500',
      textColor: 'text-violet-600',
    },
  };
  return colors[color] || colors.primary;
}
