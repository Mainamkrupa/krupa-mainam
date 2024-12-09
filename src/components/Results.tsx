import React from 'react';
import { AlertCircle, CheckCircle, Brain, AlertTriangle } from 'lucide-react';

interface ResultsProps {
  prediction: {
    hasTumor: boolean;
    confidence: number;
    tumorType?: string;
    recommendations?: string[];
    riskLevel?: 'low' | 'medium' | 'high';
  } | null;
}

export const Results: React.FC<ResultsProps> = ({ prediction }) => {
  if (!prediction) return null;

  const getRiskBadge = (risk?: 'low' | 'medium' | 'high') => {
    const badges = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    if (!risk) return null;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${badges[risk]}`}>
        <AlertTriangle className="w-4 h-4 mr-1" />
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {prediction.hasTumor ? (
            <AlertCircle className="w-8 h-8 text-red-500" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-500" />
          )}
          <div>
            <h3 className="text-xl font-semibold">
              {prediction.hasTumor ? 'Tumor Detected' : 'No Tumor Detected'}
            </h3>
            <p className="text-gray-600">
              Confidence: {prediction.confidence}%
            </p>
          </div>
        </div>
        {getRiskBadge(prediction.riskLevel)}
      </div>

      {prediction.hasTumor && prediction.tumorType && (
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Tumor Classification
          </h4>
          <p className="text-gray-700 bg-purple-50 p-3 rounded">
            {prediction.tumorType}
          </p>
        </div>
      )}

      {prediction.recommendations && prediction.recommendations.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-3">Recommended Actions</h4>
          <ul className="space-y-2">
            {prediction.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-6 h-6 bg-purple-100 text-purple-700 rounded-full text-center leading-6 mr-2">
                  {index + 1}
                </span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};