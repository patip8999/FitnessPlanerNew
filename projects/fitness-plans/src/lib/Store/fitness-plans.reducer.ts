import { createReducer, on } from '@ngrx/store';
import { TrainingPlanModel } from '../Models/training-plan.model';
import {
  loadFitnessPlans,
  loadFitnessPlansSuccess,
  loadFitnessPlansFailure,
  createFitnessPlan,
  createFitnessPlanSuccess,
  createFitnessPlanFailure,
  updateFitnessPlan,
  updateFitnessPlanSuccess,
  updateFitnessPlanFailure,
  deleteFitnessPlan,
  deleteFitnessPlanSuccess,
  deleteFitnessPlanFailure,
} from './fitness-plans.actions';

export interface FitnessPlansState {
  plans: TrainingPlanModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: FitnessPlansState = {
  plans: [],
  loading: false,
  error: null,
};

export const fitnessPlansReducer = createReducer(
  initialState,
  on(loadFitnessPlans, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadFitnessPlansSuccess, (state, { plans }) => ({
    ...state,
    plans,
    loading: false,
    error: null,
  })),
  on(loadFitnessPlansFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createFitnessPlan, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createFitnessPlanSuccess, (state, { plan }) => ({
    ...state,
    plans: [...state.plans, plan],
    loading: false,
    error: null,
  })),
  on(createFitnessPlanFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateFitnessPlan, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateFitnessPlanSuccess, (state, { plan }) => ({
    ...state,
    plans: state.plans.map((p) => (p.id === plan.id ? plan : p)),
    loading: false,
    error: null,
  })),
  on(updateFitnessPlanFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(deleteFitnessPlan, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(deleteFitnessPlanSuccess, (state, { planId }) => ({
    ...state,
    plans: state.plans.filter((p) => p.id !== planId),
    loading: false,
    error: null,
  })),
  on(deleteFitnessPlanFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);