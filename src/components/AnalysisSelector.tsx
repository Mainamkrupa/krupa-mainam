import React from 'react';
import { Brain, Stethoscope } from 'lucide-react';

interface AnalysisSelectorProps {
  selected: 'mri' | 'symptoms' | null;
  onSelect: (type: 'mri' | 'symptoms') => void;
}

export const AnalysisSelector: React.FC<AnalysisSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <button
        onClick={() => onSelect('mri')}
        className={`p-6 rounded-lg shadow-lg transition-all ${
          selected === 'mri'
            ? 'bg-purple-100 border-2 border-purple-500'
            : 'bg-white hover:bg-purple-50'
        }`}
      >
        <Brain className="w-12 h-12 mx-auto mb-4 text-purple-600" />
        <h2 className="text-xl font-semibold mb-2">MRI Scan Analysis</h2>
        <p className="text-gray-600">
          Upload your MRI scan for AI-powered tumor detection using ResNet50 and VGG16 models
        </p>
      </button>

      <button
        onClick={() => onSelect('symptoms')}
        className={`p-6 rounded-lg shadow-lg transition-all ${
          selected === 'symptoms'
            ? 'bg-purple-100 border-2 border-purple-500'
            : 'bg-white hover:bg-purple-50'
        }`}
      >
        <Stethoscope className="w-12 h-12 mx-auto mb-4 text-purple-600" />
        <h2 className="text-xl font-semibold mb-2">Symptom Analysis</h2>
        <p className="text-gray-600">
          Check your symptoms against our database for preliminary risk assessment
        </p>
      </button>
    </div>
  );
};