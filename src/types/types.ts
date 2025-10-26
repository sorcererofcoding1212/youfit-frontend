export interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
}

export interface Category {
  _id: string;
  muscleGroupName: string;
}

export interface Exercise {
  _id: string;
  name: string;
  category: "strength" | "cardio";
  exerciseType: "isolation" | "compound";
}

export interface Workout {
  _id: string;
  createdAt: Date;
  exerciseId: Exercise;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
  _id: string;
}

export type GraphResponse =
  | VolumeResponse
  | DistributionResponse
  | StrengthResponse;

export interface VolumeResponse {
  date: string;
  volume: number;
}

export interface DistributionResponse {
  muscle: string;
  volume: number;
}

export interface StrengthResponse {
  date: string;
  load: number;
  weight: number;
  reps: number;
}
