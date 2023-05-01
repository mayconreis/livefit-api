export interface IRoutineResponse {
  id: number;
  patientId: number;
  nutritionistId: number;
  meals: object;
  createdAt?: Date;
  updatedAt?: Date;
}
