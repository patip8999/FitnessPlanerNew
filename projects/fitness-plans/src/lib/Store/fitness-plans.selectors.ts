import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FitnessPlansState } from './fitness-plans.reducer';

export const selectFitnessPlansState = createFeatureSelector<FitnessPlansState>('fitnessPlans');

export const selectAllFitnessPlans = createSelector(
  selectFitnessPlansState,
  (state: FitnessPlansState) => state.plans
);

export const selectFitnessPlansLoading = createSelector(
  selectFitnessPlansState,
  (state: FitnessPlansState) => state.loading
);

export const selectFitnessPlansError = createSelector(
  selectFitnessPlansState,
  (state: FitnessPlansState) => state.error
);