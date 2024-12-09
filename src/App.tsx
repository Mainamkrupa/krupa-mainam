import React, { useState } from 'react';
import { Header } from './components/Header';
import { AnalysisSelector } from './components/AnalysisSelector';
import { MRIAnalysis } from './components/MRIAnalysis';
import { SymptomAnalysis } from './components/SymptomAnalysis';

function App() {
  const [analysisType, setAnalysisType] = useState<'mri' | 'symptoms' | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnalysisSelector 
          selected={analysisType} 
          onSelect={setAnalysisType} 
        />
        
        {analysisType === 'mri' && <MRIAnalysis />}
        {analysisType === 'symptoms' && <SymptomAnalysis />}

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About Our Technology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-purple-700">ResNet50</h3>
              <p className="text-gray-600">
                Our implementation of ResNet50 achieves high accuracy in tumor detection through deep residual learning, allowing the model to effectively analyze complex MRI features.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-purple-700">VGG16</h3>
              <p className="text-gray-600">
                The VGG16 architecture complements our analysis by providing detailed feature extraction, particularly useful for tumor classification and characterization.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          
          <p className="text-sm">
            © {new Date().getFullYear()} brain tumor detection and treatment <recommendations className="q"></recommendations>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;