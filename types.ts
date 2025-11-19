export interface HRTool {
  name: string;
  category: string;
  description: string;
  keyFeatures: string[];
  rationale: string; 
}

export interface EmergingTechnology {
  name: string;
  description: string;
  impact: string;
}

export interface HRAnalysis {
  currentImpact: string;
  futureGrowth: string;
  emergingTechnologies: EmergingTechnology[];
}
