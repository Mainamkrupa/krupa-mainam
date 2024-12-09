import React, { useState } from 'react';
import { Results } from './Results';
import { Loader2, ClipboardList } from 'lucide-react';
import { generateSymptomPrediction } from '../utils/predictions';

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

export const SymptomAnalysis: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleSymptomToggle = async (symptomId: string) => {
    const newSymptoms = selectedSymptoms.includes(symptomId)
      ? selectedSymptoms.filter(id => id !== symptomId)
      : [...selectedSymptoms, symptomId];
    
    setSelectedSymptoms(newSymptoms);
    setIsProcessing(true);

    try {
      const result = await generateSymptomPrediction(newSymptoms);
      setPrediction(result);
    } catch (error) {
      console.error('Error updating prediction:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-medium">Select Your Symptoms</h3>
          </div>
          <p className="text-gray-600 mb-4">Check all symptoms that apply:</p>
          <div className="grid gap-3">
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
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        
        {isProcessing ? (
          <div className="flex items-center justify-center h-48 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
              <p className="text-gray-600">Analyzing symptoms...</p>
            </div>
          </div>
        ) : prediction ? (
          <Results prediction={prediction} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-500 text-center">
              Select symptoms to begin analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};