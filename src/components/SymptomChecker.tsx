import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';

const commonSymptoms = [
  { id: 'headache', label: 'Frequent Headaches' },
  { id: 'vision', label: 'Vision Problems' },
  { id: 'balance', label: 'Balance Issues' },
  { id: 'nausea', label: 'Nausea or Vomiting' },
  { id: 'speech', label: 'Speech Difficulties' },
  { id: 'seizures', label: 'Seizures' },
  { id: 'weakness', label: 'Muscle Weakness' },
  { id: 'memory', label: 'Memory Problems' },
  { id: 'personality', label: 'Personality Changes' },
  { id: 'drowsiness', label: 'Unusual Drowsiness' }
];

interface SymptomCheckerProps {
  onSymptomsChange: (symptoms: string[]) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSymptomsChange }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSymptoms = prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId];
      onSymptomsChange(newSymptoms);
      return newSymptoms;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <ClipboardList className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-medium">Symptom Checker</h3>
      </div>
      <p className="text-gray-600 mb-4">Select all symptoms that apply:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {commonSymptoms.map(symptom => (
          <label
            key={symptom.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors
              ${selectedSymptoms.includes(symptom.id)
                ? 'bg-purple-100 text-purple-900'
                : 'bg-gray-50 hover:bg-gray-100'
              }`}
          >
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(symptom.id)}
              onChange={() => handleSymptomToggle(symptom.id)}
              className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
            />
            <span className="ml-3">{symptom.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};