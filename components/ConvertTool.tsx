
import React, { useState, useCallback, useEffect } from 'react';
import { FileUploader } from './FileUploader';
import { FileList } from './FileList';
import { convertToPDF } from '../services/fileProcessor';
import { ProcessResult } from '../types';
import { CheckCircleIcon, DownloadIcon, SpinnerIcon } from './icons';

export const ConvertTool: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<ProcessResult | null>(null);

    useEffect(() => {
        // Clean up object URLs when component unmounts or result changes
        return () => {
            if (result?.url) {
                URL.revokeObjectURL(result.url);
            }
        };
    }, [result]);

    const handleFileAdded = useCallback((newFiles: File[]) => {
        setResult(null); // Clear previous result
        if (newFiles.length > 0) {
            setFile(newFiles[0]);
        }
    }, []);

    const handleRemoveFile = useCallback(() => {
        setFile(null);
    }, []);

    const handleConvert = async () => {
        if (!file) {
            alert("Please select a file to convert.");
            return;
        }
        setIsProcessing(true);
        setResult(null);
        const convertResult = await convertToPDF(file);
        setResult(convertResult);
        setIsProcessing(false);
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
        setIsProcessing(false);
    };

    if (result) {
        return (
            <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Conversion Successful!</h3>
                <p className="mt-1 text-slate-500 dark:text-slate-400">Your PDF is ready for download.</p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={result.url}
                        download={result.fileName}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <DownloadIcon className="h-5 w-5 mr-2"/>
                        Download PDF
                    </a>
                    <button
                        onClick={handleReset}
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Convert Another File
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <FileUploader
                onFilesAdded={handleFileAdded}
                accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                multiple={false}
                title="Drag & drop your presentation"
                description="or click to select a single .pptx file"
            />
            {file && <FileList files={[file]} onRemoveFile={handleRemoveFile} />}
            {file && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        {isProcessing ? (
                            <>
                                <SpinnerIcon className="h-5 w-5 mr-3" />
                                Converting...
                            </>
                        ) : `Convert to PDF`}
                    </button>
                </div>
            )}
        </div>
    );
};