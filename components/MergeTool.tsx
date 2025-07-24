
import React, { useState, useCallback, useEffect } from 'react';
import { FileUploader } from './FileUploader';
import { FileList } from './FileList';
import { mergePPTs } from '../services/fileProcessor';
import { ProcessResult } from '../types';
import { CheckCircleIcon, DownloadIcon, SpinnerIcon } from './icons';

export const MergeTool: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
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

    const handleFilesAdded = useCallback((newFiles: File[]) => {
        setResult(null); // Clear previous result
        setFiles(prevFiles => {
            const existingFileNames = new Set(prevFiles.map(f => f.name));
            const uniqueNewFiles = newFiles.filter(f => !existingFileNames.has(f.name));
            return [...prevFiles, ...uniqueNewFiles];
        });
    }, []);

    const handleRemoveFile = useCallback((fileName: string) => {
        setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
    }, []);

    const handleMerge = async () => {
        if (files.length < 2) {
            alert("Please select at least two files to merge.");
            return;
        }
        setIsProcessing(true);
        setResult(null);
        const mergeResult = await mergePPTs(files);
        setResult(mergeResult);
        setIsProcessing(false);
    };
    
    const handleReset = () => {
        setFiles([]);
        setResult(null);
        setIsProcessing(false);
    };

    if (result) {
        return (
            <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Merge Successful!</h3>
                <p className="mt-1 text-slate-500 dark:text-slate-400">Your presentation is ready for download.</p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={result.url}
                        download={result.fileName}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <DownloadIcon className="h-5 w-5 mr-2"/>
                        Download Merged File
                    </a>
                    <button
                        onClick={handleReset}
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Merge More Files
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <FileUploader
                onFilesAdded={handleFilesAdded}
                accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                multiple={true}
                title="Drag & drop your presentations"
                description="or click to select multiple .pptx files"
            />
            <FileList files={files} onRemoveFile={handleRemoveFile} />
            {files.length > 0 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleMerge}
                        disabled={isProcessing || files.length < 2}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        {isProcessing ? (
                            <>
                                <SpinnerIcon className="h-5 w-5 mr-3" />
                                Merging...
                            </>
                        ) : `Merge ${files.length} Files`}
                    </button>
                     {files.length < 2 && (
                         <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">Please add at least two files to merge.</p>
                     )}
                </div>
            )}
        </div>
    );
};