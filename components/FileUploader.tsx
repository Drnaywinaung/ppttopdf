
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons';

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void;
  accept: string;
  multiple: boolean;
  title: string;
  description: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesAdded, accept, multiple, title, description }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const acceptedFiles = Array.from(e.dataTransfer.files).filter((file: File) => 
        accept.split(',').some(type => file.type.includes(type.trim().replace('.','')) || file.name.endsWith(type.trim()))
      );
      onFilesAdded(acceptedFiles);
    }
  }, [accept, onFilesAdded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300
        ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700/30'}`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <UploadIcon className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
      <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
};