
import { ProcessResult } from '../types';

/**
 * Simulates a backend process for merging PowerPoint files.
 * In a real application, this would send files to a server.
 * Here, it just returns the first file to simulate a successful merge.
 * @param files - An array of .pptx files to merge.
 * @returns A promise that resolves to a simulated result with a blob URL.
 */
export const mergePPTs = (files: File[]): Promise<ProcessResult> => {
    console.log("Simulating merge for:", files.map(f => f.name));
    return new Promise(resolve => {
        setTimeout(() => {
            if (files.length === 0) {
                // This case should be handled by UI, but as a fallback.
                return resolve({ url: '', fileName: '' });
            }
            // Create a blob URL for the first file to act as the "merged" download
            const url = URL.createObjectURL(files[0]);
            const result: ProcessResult = {
                url: url,
                fileName: 'merged_presentation.pptx',
            };
            resolve(result);
        }, 2500); // Simulate network and processing delay
    });
};

/**
 * Simulates a backend process for converting a PowerPoint file to PDF.
 * In a real application, this would send the file to a server for conversion.
 * Here, it returns the same file with a changed extension to simulate success.
 * @param file - The .pptx file to convert.
 * @returns A promise that resolves to a simulated result with a blob URL.
 */
export const convertToPDF = (file: File): Promise<ProcessResult> => {
    console.log("Simulating PDF conversion for:", file.name);
    return new Promise(resolve => {
        setTimeout(() => {
            const originalName = file.name;
            const pdfName = originalName.replace(/\.pptx?$/i, '.pdf');

            // Create a blob URL for the original file. The downloaded file will
            // be the original PPTX, but with a .pdf name. This is a simulation limitation.
            const url = URL.createObjectURL(file);
            const result: ProcessResult = {
                url: url,
                fileName: pdfName,
            };
            resolve(result);
        }, 2500); // Simulate network and processing delay
    });
};