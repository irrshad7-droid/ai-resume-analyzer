import { FileSearch, FileCheck, CheckCircle, Lightbulb, Code, Info, Download } from 'lucide-react';
import type { ResumeAnalysis } from '@/types';
import { ScoreCard } from './ScoreCard';
import { FeedbackSection, ProjectCard } from './FeedbackSection';
import { ScoreBreakdown } from './ScoreBreakdown';
import { ATSKeywords } from './ATSKeywords';
import { ImprovementRoadmap } from './Roadmap';
import { RedFlags } from './RedFlags';
import { InterviewReadiness } from './InterviewReadiness';

interface AnalysisDashboardProps {
  analysis: ResumeAnalysis;
  onDownloadPDF?: () => void;
}

export function AnalysisDashboard({ analysis, onDownloadPDF }: AnalysisDashboardProps) {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-4">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-700">Analysis Complete</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
          Your Resume Analysis
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Here's a comprehensive evaluation of your resume with actionable insights for improvement
        </p>

        {onDownloadPDF && (
          <button
            onClick={onDownloadPDF}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4" />
            Download Analysis Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScoreCard
              title="Overall Resume Score"
              score={analysis.overallScore}
              icon={<FileSearch className="w-5 h-5 text-primary-500" />}
              description="Based on all evaluation criteria"
            />
            <ScoreCard
              title="ATS Friendliness"
              score={analysis.atsScore}
              icon={<FileCheck className="w-5 h-5 text-primary-500" />}
              description="Applicant tracking system compatibility"
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary-400" />
              <h3 className="font-semibold">Why This Score?</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{analysis.whyThisScore}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreBreakdown breakdown={analysis.scoreBreakdown} />
        <ATSKeywords keywords={analysis.atsKeywords} />
      </div>

      <InterviewReadiness readiness={analysis.interviewReadiness} />

      <RedFlags redFlags={analysis.redFlags} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedbackSection
          title="Strengths"
          items={analysis.strengths}
          type="strength"
        />
        <FeedbackSection
          title="Weaknesses"
          items={analysis.weaknesses}
          type="weakness"
        />
      </div>

      {analysis.missingSkills.length > 0 && (
        <div className="p-6 rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-xl shadow-sm">
              <Lightbulb className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700">Skills to Consider Adding</h3>
              <p className="text-xs text-slate-500">Commonly expected skills for software engineering roles</p>
            </div>
            <span className="ml-auto text-sm font-medium text-orange-600">{analysis.missingSkills.length} skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium text-orange-700 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200/60 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {analysis.projectFeedback.length > 0 && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-xl">
              <Code className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-700">Project Evaluations</h3>
              <p className="text-sm text-slate-500">Detailed assessment of each project</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.projectFeedback.map((project, index) => (
              <ProjectCard
                key={index}
                name={project.name}
                evaluation={project.evaluation}
                score={project.score}
                complexityScore={project.complexityScore}
                resumeValue={project.resumeValue}
                recruiterInterest={project.recruiterInterest}
                whatIsGood={project.whatIsGood}
                whatIsWeak={project.whatIsWeak}
                howToImprove={project.howToImprove}
              />
            ))}
          </div>
        </div>
      )}

      <ImprovementRoadmap roadmap={analysis.roadmap} />

      {analysis.recommendations.length > 0 && (
        <div className="p-6 rounded-2xl border border-primary-200/60 bg-gradient-to-br from-primary-50 via-white to-white hover:shadow-lg transition-all">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-primary-100 rounded-xl shadow-sm">
              <Lightbulb className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700">Actionable Recommendations</h3>
              <p className="text-xs text-slate-500">Steps to improve your resume</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-slate-100 hover:border-primary-200 transition-colors">
                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
