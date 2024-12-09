interface Prediction {
  hasTumor: boolean;
  confidence: number;
  tumorType?: string;
  recommendations?: string[];
  riskLevel?: 'low' | 'medium' | 'high';
}

const analyzeSymptomsRisk = (symptoms: string[]): 'low' | 'medium' | 'high' => {
  const severityMap: { [key: string]: number } = {
    headache: 1,
    vision: 2,
    balance: 2,
    nausea: 1,
    speech: 3,
    seizures: 3,
    weakness: 2,
    memory: 2,
    personality: 2,
    drowsiness: 1
  };

  const totalSeverity = symptoms.reduce((acc, symptom) => acc + (severityMap[symptom] || 0), 0);
  const maxPossibleSeverity = Object.values(severityMap).reduce((a, b) => a + b, 0);
  const severityPercentage = (totalSeverity / maxPossibleSeverity) * 100;

  if (severityPercentage >= 60) return 'high';
  if (severityPercentage >= 30) return 'medium';
  return 'low';
};

export const generateMRIPrediction = async (image: File): Promise<Prediction> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const random = Math.random();
  
  if (random > 0.5) {
    return {
      hasTumor: true,
      confidence: 94.7,
      tumorType: "Glioblastoma Multiforme (Grade IV)",
      riskLevel: 'high',
      recommendations: [
        "Immediate consultation with a neuro-oncologist",
        "Schedule an advanced MRI with contrast",
        "Consider surgical biopsy for detailed analysis",
        "Evaluate treatment options including surgery, radiation, and chemotherapy"
      ]
    };
  } else {
    return {
      hasTumor: false,
      confidence: 98.2,
      riskLevel: 'low',
      recommendations: [
        "Schedule regular follow-up scans every 6 months",
        "Maintain regular neurological check-ups",
        "Report any new symptoms immediately"
      ]
    };
  }
};

export const generateSymptomPrediction = async (symptoms: string[]): Promise<Prediction> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const riskLevel = analyzeSymptomsRisk(symptoms);
  
  if (riskLevel === 'high') {
    return {
      hasTumor: true,
      confidence: 75.5,
      riskLevel,
      recommendations: [
        "Urgent neurological consultation recommended",
        "Schedule an MRI scan as soon as possible",
        ...symptoms.includes('seizures') ? ["Anti-seizure medication evaluation recommended"] : [],
        ...symptoms.includes('headache') ? ["Pain management consultation advised"] : [],
        ...symptoms.includes('vision') ? ["Immediate ophthalmological examination needed"] : []
      ]
    };
  } else {
    return {
      hasTumor: false,
      confidence: 85.3,
      riskLevel,
      recommendations: [
        "Schedule a routine check-up with your primary care physician",
        "Monitor symptoms and maintain a symptom diary",
        "Return for evaluation if symptoms worsen",
        ...symptoms.includes('headache') ? ["Consider migraine assessment"] : [],
        ...symptoms.includes('vision') ? ["Schedule an eye examination"] : []
      ]
    };
  }
};