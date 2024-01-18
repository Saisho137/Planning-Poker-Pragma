export interface ScoringModeItemI  {
  id: number;
  value: string;
}

export interface ScoringModeI {
  [key: string]: ScoringModeItemI[];
}
