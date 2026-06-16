/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'jspdf' {
  interface jsPDF {
    internal: {
      pageSize: {
        getWidth: () => number;
        getHeight: () => number;
      };
    };
    setFillColor(r: number, g: number, b: number): jsPDF;
    setDrawColor(r: number, g: number, b: number): jsPDF;
    setTextColor(r: number, g: number, b: number): jsPDF;
    setFontSize(size: number): jsPDF;
    setFont(helvetica: string, style: string): jsPDF;
    rect(x: number, y: number, w: number, h: number, style: string): jsPDF;
    roundedRect(x: number, y: number, w: number, h: number, rx: number, ry: number, style: string): jsPDF;
    line(x1: number, y1: number, x2: number, y2: number): jsPDF;
    text(text: string, x: number, y: number, options?: { align?: string }): jsPDF;
    splitTextToSize(text: string, width: number): string[];
    addPage(): void;
    save(filename: string): void;
  }
}
