import { getScoreColor, getScoreBgColor, getScoreGradient, getScoreLabel } from '@/utils';

interface ScoreCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
}

export function ScoreCard({ title, score, icon, description }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const gradient = getScoreGradient(score);

  return (
    <div className="relative p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300/60 transition-all duration-300 overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-sm">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-700">{title}</h3>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`${gradient.split(' ')[0].replace('from-', 'text-')}`} style={{ stopColor: 'currentColor' }} />
                  <stop offset="100%" className={`${gradient.split(' ')[1].replace('to-', 'text-')}`} style={{ stopColor: 'currentColor' }} />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-100"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`stroke-current ${getScoreColor(score)} transition-all duration-1000 ease-out`}
                style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-xs text-slate-400 font-medium">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getScoreColor(score)} bg-gradient-to-r ${getScoreBgColor(score)}`}>
              {getScoreLabel(score)}
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ScoreGaugeProps {
  score: number;
  label?: string;
}

export function ScoreGauge({ score, label }: ScoreGaugeProps) {
  const gradient = getScoreGradient(score);

  return (
    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
      <div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out shadow-sm`}
        style={{ width: `${score}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-600 drop-shadow-sm">{label || `${score}%`}</span>
      </div>
    </div>
  );
}
