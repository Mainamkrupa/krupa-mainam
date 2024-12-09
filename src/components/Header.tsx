import React from 'react';
import { Brain, Activity } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-6 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold">Automated Brain Tumor Detection</h1>
            <p className="text-purple-200">Advanced Brain Tumor Detection</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span className="text-sm font-medium">Powered by deep-learning models</span>
        </div>
      </div>
    </header>
  );
};