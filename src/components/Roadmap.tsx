import type { ImprovementRoadmap as RoadmapType } from '@/types';
import { Map, Rocket, Wrench, Trophy, ChevronRight } from 'lucide-react';

interface ImprovementRoadmapProps {
  roadmap: RoadmapType;
}

export function ImprovementRoadmap({ roadmap }: ImprovementRoadmapProps) {
  const phases = [
    {
      data: roadmap.week1to4,
      weeks: 'Week 1-4',
      icon: <Rocket className="w-5 h-5" />,
      color: 'primary',
    },
    {
      data: roadmap.week5to8,
      weeks: 'Week 5-8',
      icon: <Wrench className="w-5 h-5" />,
      color: 'amber',
    },
    {
      data: roadmap.week9to12,
      weeks: 'Week 9-12',
      icon: <Trophy className="w-5 h-5" />,
      color: 'emerald',
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl">
          <Map className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">90-Day Improvement Plan</h3>
          <p className="text-xs text-slate-500">Personalized roadmap based on your resume gaps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {phases.map((phase, index) => {
          const colorClasses = getPhaseColor(phase.color);

          return (
            <div key={index} className={`p-4 rounded-xl border ${colorClasses.border} ${colorClasses.bg}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${colorClasses.iconBg}`}>
                  <span className={colorClasses.iconColor}>{phase.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">{phase.weeks}</p>
                  <p className="text-sm font-semibold text-slate-700">{phase.data.title}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {phase.data.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-2">
                    <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colorClasses.iconColor}`} />
                    <span className="text-xs text-slate-600 leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getPhaseColor(color: string) {
  const colors: Record<string, { border: string; bg: string; iconBg: string; iconColor: string }> = {
    primary: {
      border: 'border-primary-200/60',
      bg: 'bg-gradient-to-br from-primary-50 to-white',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
    },
    amber: {
      border: 'border-amber-200/60',
      bg: 'bg-gradient-to-br from-amber-50 to-white',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    emerald: {
      border: 'border-emerald-200/60',
      bg: 'bg-gradient-to-br from-emerald-50 to-white',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  };
  return colors[color] || colors.primary;
}
