
import React from 'react';
import { PowerPointIcon, TrashIcon } from './icons';

interface FileListProps {
  files: File[];
  onRemoveFile: (fileName: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) {
    return null;
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white mb-2">Selected Files</h3>
      <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-md">
        {files.map((file) => (
          <li key={file.name} className="flex items-center justify-between p-3">
            <div className="flex items-center min-w-0">
              <PowerPointIcon className="h-8 w-8 text-orange-500 flex-shrink-0" />
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{file.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{formatBytes(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(file.name)}
              type="button"
              className="ml-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <TrashIcon className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};