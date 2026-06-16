export const GEMINI_MODEL = 'gemini-2.5-flash-lite';

export interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;
  atsKeywords: ATSKeywords;
  scoreBreakdown: ScoreBreakdown;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  projectFeedback: ProjectFeedback[];
  recommendations: string[];
  roadmap: ImprovementRoadmap;
  redFlags: RedFlag[];
  interviewReadiness: InterviewReadiness;
  whyThisScore: string;
}

export interface ScoreBreakdown {
  technicalSkills: number;
  technicalSkillsMax: number;
  technicalSkillsReason: string;
  projects: number;
  projectsMax: number;
  projectsReason: string;
  experience: number;
  experienceMax: number;
  experienceReason: string;
  atsOptimization: number;
  atsOptimizationMax: number;
  atsOptimizationReason: string;
  resumeStructure: number;
  resumeStructureMax: number;
  resumeStructureReason: string;
  education: number;
  educationMax: number;
  educationReason: string;
}

export interface ATSKeywords {
  matched: string[];
  missing: string[];
  coverage: number;
}

export interface ProjectFeedback {
  name: string;
  evaluation: string;
  score: number;
  complexityScore: number;
  resumeValue: number;
  recruiterInterest: number;
  whatIsGood: string;
  whatIsWeak: string;
  howToImprove: string;
}

export interface RoadmapPhase {
  title: string;
  tasks: string[];
}

export interface ImprovementRoadmap {
  week1to4: RoadmapPhase;
  week5to8: RoadmapPhase;
  week9to12: RoadmapPhase;
}

export interface RedFlag {
  issue: string;
  whyItMatters: string;
  severity: 'high' | 'medium' | 'low';
}

export interface InterviewReadiness {
  frontend: number;
  frontendReason: string;
  backend: number;
  backendReason: string;
  fullstack: number;
  fullstackReason: string;
  internship: number;
  internshipReason: string;
  overall: number;
}

export interface UploadedFile {
  file: File;
  text: string;
}

export type ProcessingStatus = 'idle' | 'uploading' | 'extracting' | 'analyzing' | 'complete' | 'error';

export interface AppState {
  status: ProcessingStatus;
  analysis: ResumeAnalysis | null;
  error: string | null;
  uploadedFileName: string | null;
}

export interface AnalysisHistoryItem {
  id: string;
  fileName: string;
  analysis: ResumeAnalysis;
  date: string;
}
