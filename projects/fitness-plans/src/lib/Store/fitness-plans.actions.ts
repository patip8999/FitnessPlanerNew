import { createAction, props } from '@ngrx/store';
import { TrainingPlanModel } from '../Models/training-plan.model';

export const loadFitnessPlans = createAction('[Fitness Plans] Load Fitness Plans');
export const loadFitnessPlansSuccess = createAction(
  '[Fitness Plans] Load Fitness Plans Success',
  props<{ plans: TrainingPlanModel[] }>()
);
export const loadFitnessPlansFailure = createAction(
  '[Fitness Plans] Load Fitness Plans Failure',
  props<{ error: string }>()
);

export const createFitnessPlan = createAction(
  '[Fitness Plans] Create Fitness Plan',
  props<{ plan: TrainingPlanModel }>()
);
export const createFitnessPlanSuccess = createAction(
  '[Fitness Plans] Create Fitness Plan Success',
  props<{ plan: TrainingPlanModel }>()
);
export const createFitnessPlanFailure = createAction(
  '[Fitness Plans] Create Fitness Plan Failure',
  props<{ error: string }>()
);

export const updateFitnessPlan = createAction(
  '[Fitness Plans] Update Fitness Plan',
  props<{ plan: TrainingPlanModel }>()
);
export const updateFitnessPlanSuccess = createAction(
  '[Fitness Plans] Update Fitness Plan Success',
  props<{ plan: TrainingPlanModel }>()
);
export const updateFitnessPlanFailure = createAction(
  '[Fitness Plans] Update Fitness Plan Failure',
  props<{ error: string }>()
);

export const deleteFitnessPlan = createAction(
  '[Fitness Plans] Delete Fitness Plan',
  props<{ planId: string }>()
);
export const deleteFitnessPlanSuccess = createAction(
  '[Fitness Plans] Delete Fitness Plan Success',
  props<{ planId: string }>()
);
export const deleteFitnessPlanFailure = createAction(
  '[Fitness Plans] Delete Fitness Plan Failure',
  props<{ error: string }>()
);