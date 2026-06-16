import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    textParts.push(pageText);
  }

  const fullText = textParts.join('\n\n').trim();

  if (fullText.length < 50) {
    throw new Error('Could not extract meaningful text from PDF. The document may be scanned or image-based.');
  }

  return fullText;
}

export function validatePDF(file: File): { valid: boolean; error?: string } {
  const validTypes = ['application/pdf'];
  const validExtensions = ['.pdf'];

  const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));

  if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
    return { valid: false, error: 'Please upload a PDF file.' };
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be under 10MB.' };
  }

  if (file.size < 100) {
    return { valid: false, error: 'File appears to be empty or corrupted.' };
  }

  return { valid: true };
}
