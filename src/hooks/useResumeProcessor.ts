import { useState, useCallback } from 'react';
import type { AppState, ProcessingStatus } from '@/types';
import { extractTextFromPDF, validatePDF } from '@/services/pdfExtractor';
import { analyzeResume } from '@/services/gemini';

const initialState: AppState = {
  status: 'idle',
  analysis: null,
  error: null,
  uploadedFileName: null,
};

export function useResumeProcessor() {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const processResume = useCallback(async (file: File) => {
    updateState({ status: 'uploading' as ProcessingStatus, error: null, uploadedFileName: file.name });

    const validation = validatePDF(file);
    if (!validation.valid) {
      updateState({ status: 'error' as ProcessingStatus, error: validation.error });
      return;
    }

    try {
      updateState({ status: 'extracting' as ProcessingStatus });

      const text = await extractTextFromPDF(file);

      updateState({ status: 'analyzing' as ProcessingStatus });

      const analysis = await analyzeResume(text);

      updateState({
        status: 'complete' as ProcessingStatus,
        analysis,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      updateState({ status: 'error' as ProcessingStatus, error: errorMessage });
    }
  }, [updateState]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    processResume,
    reset,
    isProcessing: state.status !== 'idle' && state.status !== 'complete' && state.status !== 'error',
  };
}
