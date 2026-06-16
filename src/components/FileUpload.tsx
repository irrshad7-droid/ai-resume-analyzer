import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { ProcessingStatus } from '@/types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  status: ProcessingStatus;
  uploadedFileName: string | null;
  error: string | null;
}

export function FileUpload({ onFileSelect, status, uploadedFileName, error }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: status === 'uploading' || status === 'extracting' || status === 'analyzing',
  });

  const isProcessing = status !== 'idle' && status !== 'complete' && status !== 'error';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out overflow-hidden
          ${isDragActive
            ? 'border-primary-500 bg-primary-50 scale-[1.02] shadow-lg'
            : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50 hover:shadow-md'
          }
          ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          {status === 'idle' && !error && (
            <>
              <div className="p-4 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl shadow-sm">
                <Upload className="w-8 h-8 text-primary-500" />
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-700 mb-1">
                  {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                </p>
                <p className="text-sm text-slate-500">
                  or <span className="text-primary-600 font-medium hover:text-primary-700">browse files</span> to upload
                </p>
                <p className="text-xs text-slate-400 mt-2">PDF files only, max 10MB</p>
              </div>
            </>
          )}

          {isProcessing && (
            <>
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary-100 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <Loader2 className="absolute inset-0 m-auto w-6 h-6 text-primary-500 animate-pulse" />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-primary-700">
                  <ProcessingMessage status={status} />
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {status === 'uploading' && 'Validating your file...'}
                  {status === 'extracting' && 'Reading PDF content...'}
                  {status === 'analyzing' && 'AI is evaluating your resume...'}
                </p>
              </div>

              {uploadedFileName && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg border border-primary-200">
                  <FileText className="w-4 h-4 text-primary-500" />
                  <span className="text-xs font-medium text-primary-700">{uploadedFileName}</span>
                </div>
              )}
            </>
          )}

          {status === 'complete' && !error && (
            <>
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-emerald-700">Analysis Complete!</p>
                <p className="text-sm text-slate-500">View your detailed results below</p>
              </div>
            </>
          )}

          {error && (
            <div className="w-full max-w-md p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-red-700">Analysis Failed</p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.reload();
                }}
                className="mt-3 w-full py-2 text-xs font-medium text-red-700 bg-white hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Secure Processing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary-500" />
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Instant Results</span>
        </div>
      </div>
    </div>
  );
}

function ProcessingMessage({ status }: { status: ProcessingStatus }) {
  const messages: Record<string, string> = {
    uploading: 'Uploading resume...',
    extracting: 'Extracting text from PDF...',
    analyzing: 'Analyzing with AI...',
  };

  return <>{messages[status] || 'Processing...'}</>;
}
