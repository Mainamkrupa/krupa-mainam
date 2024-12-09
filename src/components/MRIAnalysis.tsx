import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { Results } from './Results';
import { Loader2 } from 'lucide-react';
import { generateMRIPrediction } from '../utils/predictions';

export const MRIAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleImageUpload = async (file: File) => {
    setSelectedImage(URL.createObjectURL(file));
    setIsProcessing(true);
    setPrediction(null);

    try {
      const result = await generateMRIPrediction(file);
      setPrediction(result);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Upload MRI Scan</h2>
        <ImageUpload onImageUpload={handleImageUpload} />
        
        {selectedImage && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Uploaded Scan</h3>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={selectedImage}
                alt="Uploaded MRI scan"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        
        {isProcessing ? (
          <div className="flex items-center justify-center h-48 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
              <p className="text-gray-600">Processing MRI scan with AI models...</p>
            </div>
          </div>
        ) : prediction ? (
          <Results prediction={prediction} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-500 text-center">
              Upload an MRI scan to begin analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};