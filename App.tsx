
import React, { useState } from 'react';
import { MergeTool } from './components/MergeTool';
import { ConvertTool } from './components/ConvertTool';
import { PowerPointIcon } from './components/icons';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Merge);

  const NavButton: React.FC<{
    currentMode: AppMode;
    targetMode: AppMode;
    onClick: (mode: AppMode) => void;
    children: React.ReactNode;
  }> = ({ currentMode, targetMode, onClick, children }) => {
    const isActive = currentMode === targetMode;
    return (
      <button
        onClick={() => onClick(targetMode)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-slate-900 ${
          isActive
            ? 'bg-indigo-600 text-white'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
                <PowerPointIcon className="h-10 w-10 text-orange-500" />
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">PPT Power Tools</h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Your one-stop solution for PowerPoint file operations.</p>
            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full inline-block">
                Note: This is a UI demonstration. File processing is simulated and does not produce real merged or converted files.
            </p>
        </header>

        <main className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl shadow-slate-300/30 dark:shadow-black/30">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="bg-slate-800/50 dark:bg-slate-900/50 p-1 rounded-lg flex items-center justify-center space-x-2 max-w-sm mx-auto">
              <NavButton currentMode={mode} targetMode={AppMode.Merge} onClick={setMode}>
                Merge PPTs
              </NavButton>
              <NavButton currentMode={mode} targetMode={AppMode.Convert} onClick={setMode}>
                Convert to PDF
              </NavButton>
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            {mode === AppMode.Merge ? <MergeTool /> : <ConvertTool />}
          </div>
        </main>

        <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} PPT Power Tools. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;