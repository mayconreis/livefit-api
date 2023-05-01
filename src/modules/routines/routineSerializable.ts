import { Routines } from '@src/modules/routines/sequelize';
import { IRoutineResponse } from '@src/modules/routines/interfaces';

export const routineSerializable = (routine: Routines): IRoutineResponse =>
  <IRoutineResponse>{
    id: routine.id,
    patientId: routine.patientId,
    nutritionistId: routine.nutritionistId,
    meals: routine.meals,
  };

export const routinesSerializable = (routines: Routines[]): IRoutineResponse[] =>
  routines.map((routine) => routineSerializable(routine));
