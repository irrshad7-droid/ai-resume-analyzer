import { CheckCircle, AlertTriangle, XCircle, Lightbulb, Code, Zap, TrendingUp, Briefcase, Heart, ArrowUpRight } from 'lucide-react';

interface FeedbackSectionProps {
  title: string;
  items: string[];
  type: 'strength' | 'weakness' | 'missing' | 'recommendation';
}

export function FeedbackSection({ title, items, type }: FeedbackSectionProps) {
  if (!items || items.length === 0) return null;

  const config = {
    strength: {
      icon: <CheckCircle className="w-5 h-5" />,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200/60',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-white',
      hoverBg: 'hover:from-emerald-100',
    },
    weakness: {
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200/60',
      bgColor: 'bg-gradient-to-br from-amber-50 to-white',
      hoverBg: 'hover:from-amber-100',
    },
    missing: {
      icon: <XCircle className="w-5 h-5" />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200/60',
      bgColor: 'bg-gradient-to-br from-orange-50 to-white',
      hoverBg: 'hover:from-orange-100',
    },
    recommendation: {
      icon: <Lightbulb className="w-5 h-5" />,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      borderColor: 'border-primary-200/60',
      bgColor: 'bg-gradient-to-br from-primary-50 to-white',
      hoverBg: 'hover:from-primary-100',
    },
  };

  const style = config[type];

  return (
    <div className={`p-6 rounded-2xl border ${style.borderColor} ${style.bgColor} ${style.hoverBg} transition-all hover:shadow-lg`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${style.iconBg} shadow-sm`}>
          <span className={style.iconColor}>{style.icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
        <span className="ml-auto text-sm font-medium text-slate-400">{items.length} items</span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
            <span className={`mt-1.5 w-2 h-2 rounded-full ${style.iconColor.replace('text-', 'bg-')} flex-shrink-0`} />
            <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProjectCardProps {
  name: string;
  evaluation: string;
  score: number;
  complexityScore?: number;
  resumeValue?: number;
  recruiterInterest?: number;
  whatIsGood?: string;
  whatIsWeak?: string;
  howToImprove?: string;
}

export function ProjectCard({
  name,
  evaluation,
  score,
  complexityScore = 50,
  resumeValue = 50,
  recruiterInterest = 50,
  whatIsGood,
  whatIsWeak,
  howToImprove,
}: ProjectCardProps) {
  const getScoreStyles = (s: number) => {
    if (s >= 80) return { color: 'text-emerald-600', bg: 'bg-emerald-500', light: 'bg-emerald-50' };
    if (s >= 60) return { color: 'text-amber-500', bg: 'bg-amber-500', light: 'bg-amber-50' };
    if (s >= 40) return { color: 'text-orange-500', bg: 'bg-orange-500', light: 'bg-orange-50' };
    return { color: 'text-red-500', bg: 'bg-red-500', light: 'bg-red-50' };
  };

  const styles = getScoreStyles(score);

  const metrics = [
    { label: 'Complexity', value: complexityScore, icon: <TrendingUp className="w-3 h-3" /> },
    { label: 'Resume Value', value: resumeValue, icon: <Briefcase className="w-3 h-3" /> },
    { label: 'Recruiter Interest', value: recruiterInterest, icon: <Heart className="w-3 h-3" /> },
  ];

  return (
    <div className="p-5 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg hover:border-slate-300/60 transition-all group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-primary-50 rounded-lg">
              <Code className="w-4 h-4 text-primary-500" />
            </div>
            <h4 className="font-semibold text-slate-700 truncate">{name}</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{evaluation}</p>
        </div>

        <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl ${styles.light}`}>
          <span className={`text-2xl font-bold ${styles.color}`}>{score}</span>
          <span className="text-xs text-slate-500">Score</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {metrics.map((metric, idx) => {
          const mStyles = getScoreStyles(metric.value);
          return (
            <div key={idx} className={`p-2 rounded-lg ${mStyles.light}`}>
              <div className="flex items-center gap-1 mb-1">
                <span className={mStyles.color}>{metric.icon}</span>
                <span className="text-xs text-slate-600">{metric.value}</span>
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${mStyles.bg} rounded-full`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1 truncate">{metric.label}</p>
            </div>
          );
        })}
      </div>

      {(whatIsGood || whatIsWeak || howToImprove) && (
        <div className="space-y-2 pt-3 border-t border-slate-100">
          {whatIsGood && (
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-medium text-emerald-600">Good: </span>
                <span className="text-xs text-slate-600">{whatIsGood}</span>
              </div>
            </div>
          )}
          {whatIsWeak && (
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-medium text-amber-600">Weak: </span>
                <span className="text-xs text-slate-600">{whatIsWeak}</span>
              </div>
            </div>
          )}
          {howToImprove && (
            <div className="flex items-start gap-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-medium text-primary-600">Improve: </span>
                <span className="text-xs text-slate-600">{howToImprove}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface SkillsTagProps {
  skills: string[];
}

export function SkillsTag({ skills }: SkillsTagProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-100 rounded-xl shadow-sm">
          <Zap className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-700">Missing Skills</h3>
          <p className="text-xs text-slate-500">Skills to consider adding to your resume</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 text-sm font-medium text-orange-700 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200/60 hover:border-orange-300 hover:shadow-sm transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
