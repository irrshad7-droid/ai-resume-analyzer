import type { ScoreBreakdown as ScoreBreakdownType } from '@/types';
import { Code, FolderKanban, Briefcase, FileSearch, FileText, GraduationCap, Info } from 'lucide-react';

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  const categories = [
    {
      name: 'Technical Skills',
      icon: <Code className="w-4 h-4" />,
      score: breakdown.technicalSkills,
      max: breakdown.technicalSkillsMax,
      reason: breakdown.technicalSkillsReason,
      color: 'primary',
    },
    {
      name: 'Projects',
      icon: <FolderKanban className="w-4 h-4" />,
      score: breakdown.projects,
      max: breakdown.projectsMax,
      reason: breakdown.projectsReason,
      color: 'emerald',
    },
    {
      name: 'Experience',
      icon: <Briefcase className="w-4 h-4" />,
      score: breakdown.experience,
      max: breakdown.experienceMax,
      reason: breakdown.experienceReason,
      color: 'amber',
    },
    {
      name: 'ATS Optimization',
      icon: <FileSearch className="w-4 h-4" />,
      score: breakdown.atsOptimization,
      max: breakdown.atsOptimizationMax,
      reason: breakdown.atsOptimizationReason,
      color: 'blue',
    },
    {
      name: 'Resume Structure',
      icon: <FileText className="w-4 h-4" />,
      score: breakdown.resumeStructure,
      max: breakdown.resumeStructureMax,
      reason: breakdown.resumeStructureReason,
      color: 'slate',
    },
    {
      name: 'Education',
      icon: <GraduationCap className="w-4 h-4" />,
      score: breakdown.education,
      max: breakdown.educationMax,
      reason: breakdown.educationReason,
      color: 'violet',
    },
  ];

  const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);
  const maxScore = categories.reduce((sum, cat) => sum + cat.max, 0);

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
            <Info className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Score Breakdown</h3>
            <p className="text-xs text-slate-500">Detailed scoring by category</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-800">
            {totalScore}<span className="text-sm text-slate-400">/{maxScore}</span>
          </div>
          <p className="text-xs text-slate-500">Total Points</p>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.score / category.max) * 100;
          const colorClasses = getColorClasses(category.color);

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${colorClasses.iconBg}`}>
                    <span className={colorClasses.iconColor}>{category.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{category.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-lg font-bold ${colorClasses.textColor}`}>{category.score}</span>
                  <span className="text-xs text-slate-400">/{category.max}</span>
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${colorClasses.barGradient} transition-all duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-xs text-slate-500 italic pl-1">{category.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getColorClasses(color: string) {
  const colors: Record<string, { iconBg: string; iconColor: string; textColor: string; barGradient: string }> = {
    primary: {
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-500',
      textColor: 'text-primary-600',
      barGradient: 'bg-gradient-to-r from-primary-400 to-primary-500',
    },
    emerald: {
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      textColor: 'text-emerald-600',
      barGradient: 'bg-gradient-to-r from-emerald-400 to-emerald-500',
    },
    amber: {
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      textColor: 'text-amber-600',
      barGradient: 'bg-gradient-to-r from-amber-400 to-amber-500',
    },
    blue: {
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-600',
      barGradient: 'bg-gradient-to-r from-blue-400 to-blue-500',
    },
    slate: {
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-500',
      textColor: 'text-slate-600',
      barGradient: 'bg-gradient-to-r from-slate-400 to-slate-500',
    },
    violet: {
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
      textColor: 'text-violet-600',
      barGradient: 'bg-gradient-to-r from-violet-400 to-violet-500',
    },
  };
  return colors[color] || colors.primary;
}
