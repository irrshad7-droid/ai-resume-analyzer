import { GEMINI_MODEL } from '@/types';
import type { ResumeAnalysis } from '@/types';

const STORAGE_KEY = 'gemini_api_key';

function getApiKey(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

const ANALYSIS_PROMPT = `You are a strict, realistic resume evaluator for software engineering positions. You must be CRITICAL and HONEST. Most resumes score between 40-70. Scores above 85 are RARE and require exceptional content.

SCORING RULES (CRITICAL - FOLLOW STRICTLY):
- No internship/work experience: REDUCE experience score by at least 5 points
- Missing backend/database skills: REDUCE technical skills score
- Tutorial-level projects (todo app, calculator, weather app): Score projects LOWER
- No quantifiable achievements: REDUCE structure score
- Missing cloud/deployment experience: REDUCE technical skills
- No open source contributions: Minor reduction
- Generic project descriptions: REDUCE project scores
- Scanned/image PDFs often have poor ATS scores
- Missing Git/version control: REDUCE technical skills

Analyze the resume and provide STRICT JSON output.

SCORING BREAKDOWN (be honest and critical):

1. TECHNICAL SKILLS (max 25):
   - Core languages proficiency (0-8)
   - Framework/library knowledge (0-7)
   - Backend/database exposure (0-5)
   - DevOps/cloud/deployment (0-5)
   REDUCE for: missing backend, no database skills, no cloud, weak version control

2. PROJECTS (max 25):
   - Production-readiness (0-10)
   - Technical complexity (0-8)
   - Clear impact/description (0-7)
   REDUCE for: tutorial projects, no deployment info, no clear outcomes

3. EXPERIENCE (max 20):
   - Relevant work experience (0-12)
   - Quality of descriptions (0-8)
   NO internships = maximum 6/20 here
   Academic projects only = lower score

4. ATS OPTIMIZATION (max 15):
   - Keyword coverage (0-8)
   - Readable format (0-7)

5. RESUME STRUCTURE (max 10):
   - Clear sections (0-5)
   - Concise descriptions (0-5)

6. EDUCATION (max 5):
   - Relevance (0-3)
   - Achievements (0-2)

ATS KEYWORDS TO CHECK:
Frontend: React, JavaScript, TypeScript, HTML, CSS, Vue, Angular, Next.js
Backend: Node.js, Python, Java, Go, Express, Django, Spring
Database: SQL, PostgreSQL, MongoDB, MySQL, Redis
DevOps: Git, Docker, AWS, CI/CD, Kubernetes, Linux
Other: REST API, GraphQL, Testing, Agile

Resume text to analyze:
---
{RESUME_TEXT}
---

Respond with ONLY this JSON structure (no markdown, no explanation):

{
  "overallScore": <calculated from breakdown, typically 40-70 for average resumes>,
  "atsScore": <0-100>,
  "atsKeywords": {
    "matched": [<keywords found in resume>],
    "missing": [<important keywords not found>],
    "coverage": <percentage of important keywords found 0-100>
  },
  "scoreBreakdown": {
    "technicalSkills": <score 0-25>,
    "technicalSkillsMax": 25,
    "technicalSkillsReason": "<specific explanation for score>",
    "projects": <score 0-25>,
    "projectsMax": 25,
    "projectsReason": "<specific explanation for score>",
    "experience": <score 0-20>,
    "experienceMax": 20,
    "experienceReason": "<specific explanation for score>",
    "atsOptimization": <score 0-15>,
    "atsOptimizationMax": 15,
    "atsOptimizationReason": "<specific explanation for score>",
    "resumeStructure": <score 0-10>,
    "resumeStructureMax": 10,
    "resumeStructureReason": "<specific explanation for score>",
    "education": <score 0-5>,
    "educationMax": 5,
    "educationReason": "<specific explanation for score>"
  },
  "strengths": [<3-5 specific strengths>],
  "weaknesses": [<3-5 specific weaknesses>],
  "missingSkills": [<5-10 specific missing skills>],
  "projectFeedback": [
    {
      "name": "<project name>",
      "evaluation": "<brief assessment>",
      "score": <0-100 realistic score>,
      "complexityScore": <0-100>,
      "resumeValue": <0-100>,
      "recruiterInterest": <0-100>,
      "whatIsGood": "<specific good aspect>",
      "whatIsWeak": "<specific weak aspect>",
      "howToImprove": "<specific actionable advice>"
    }
  ],
  "recommendations": [<5-8 specific actionable recommendations>],
  "roadmap": {
    "week1to4": {
      "title": "Foundation Strengthening",
      "tasks": [<3-4 specific tasks>]
    },
    "week5to8": {
      "title": "Skill Building",
      "tasks": [<3-4 specific tasks>]
    },
    "week9to12": {
      "title": "Portfolio Polish",
      "tasks": [<3-4 specific tasks>]
    }
  },
  "redFlags": [
    {
      "issue": "<specific issue found>",
      "whyItMatters": "<why this matters to recruiters>",
      "severity": "<high|medium|low>"
    }
  ],
  "interviewReadiness": {
    "frontend": <0-100>,
    "frontendReason": "<explanation>",
    "backend": <0-100>,
    "backendReason": "<explanation>",
    "fullstack": <0-100>,
    "fullstackReason": "<explanation>",
    "internship": <0-100>,
    "internshipReason": "<explanation>",
    "overall": <0-100 weighted average>
  },
  "whyThisScore": "<2-3 sentence explanation of the overall score, being honest about gaps>"
}`;

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

function parseGeminiResponse(text: string): ResumeAnalysis {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON object found in response');
  }

  const parsed = JSON.parse(jsonMatch[0]) as ResumeAnalysis;

  if (typeof parsed.overallScore !== 'number' || typeof parsed.atsScore !== 'number') {
    throw new Error('Invalid response structure: missing scores');
  }

  if (!parsed.scoreBreakdown || !parsed.atsKeywords) {
    throw new Error('Invalid response structure: missing required sections');
  }

  return {
    overallScore: Math.max(0, Math.min(100, Math.round(parsed.overallScore))),
    atsScore: Math.max(0, Math.min(100, Math.round(parsed.atsScore))),
    atsKeywords: parsed.atsKeywords || { matched: [], missing: [], coverage: 0 },
    scoreBreakdown: parsed.scoreBreakdown,
    strengths: parsed.strengths?.slice(0, 8) || [],
    weaknesses: parsed.weaknesses?.slice(0, 8) || [],
    missingSkills: parsed.missingSkills?.slice(0, 12) || [],
    projectFeedback: parsed.projectFeedback?.slice(0, 8) || [],
    recommendations: parsed.recommendations?.slice(0, 12) || [],
    roadmap: parsed.roadmap || {
      week1to4: { title: 'Foundation Strengthening', tasks: [] },
      week5to8: { title: 'Skill Building', tasks: [] },
      week9to12: { title: 'Portfolio Polish', tasks: [] },
    },
    redFlags: parsed.redFlags?.slice(0, 6) || [],
    interviewReadiness: parsed.interviewReadiness || {
      frontend: 0, frontendReason: 'Unable to assess',
      backend: 0, backendReason: 'Unable to assess',
      fullstack: 0, fullstackReason: 'Unable to assess',
      internship: 0, internshipReason: 'Unable to assess',
      overall: 0,
    },
    whyThisScore: parsed.whyThisScore || 'Score based on resume content analysis.',
  };
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add your API key in Settings.');
  }

  if (!resumeText || resumeText.trim().length < 50) {
    throw new Error('Resume text is too short for meaningful analysis.');
  }

  const prompt = ANALYSIS_PROMPT.replace('{RESUME_TEXT}', resumeText);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('API rate limit reached. Please wait a moment and try again.');
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid API key. Please check your Gemini API key in Settings.');
    }
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GeminiResponse;

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No response generated from AI. Please try again.');
  }

  const responseText = data.candidates[0]?.content?.parts?.[0]?.text;
  if (!responseText) {
    throw new Error('Empty response from AI. Please try again.');
  }

  return parseGeminiResponse(responseText);
}

export function hasApiKey(): boolean {
  return !!getApiKey();
}
