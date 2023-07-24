export type SignInUpValues = { email: string; password: string; name?: string };

export interface ExerciseSet {
  exercise: string;
  isPersonalBest: boolean;
  weight: number;
  weightUnit?: string;
  reps: number;
  order: number;
  category: string;
  distance?: string;
  distanceUnit?: string;
  time?: string;
  id: string;
}
