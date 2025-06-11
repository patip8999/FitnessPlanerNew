import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';
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
import { FitnessPlanService } from '../Services/fitness-plans.service';

export class FitnessPlansEffects {
  private actions$ = inject(Actions);
  private fitnessPlanService = inject(FitnessPlanService);
  private router = inject(Router);

  loadFitnessPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFitnessPlans),
      switchMap(() =>
        this.fitnessPlanService.getAllFitnessPlans().pipe(
          map((plans) => loadFitnessPlansSuccess({ plans })),
          catchError((error) => of(loadFitnessPlansFailure({ error: error.message })))
        )
      )
    )
  );

  createFitnessPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createFitnessPlan),
      switchMap(({ plan }) =>
        this.fitnessPlanService.createFitnessPlan(plan).pipe(
          map(() => createFitnessPlanSuccess({ plan })),
          tap(() => this.router.navigate(['/home'])),
          catchError((error) => of(createFitnessPlanFailure({ error: error.message })))
        )
      )
    )
  );

  updateFitnessPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFitnessPlan),
      switchMap(({ plan }) =>
        this.fitnessPlanService.updateFitnessPlan(plan).pipe(
          map(() => updateFitnessPlanSuccess({ plan })),
          catchError((error) => of(updateFitnessPlanFailure({ error: error.message })))
        )
      )
    )
  );

  deleteFitnessPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFitnessPlan),
      switchMap(({ planId }) =>
        this.fitnessPlanService.deleteFitnessPlan(planId).pipe(
          map(() => deleteFitnessPlanSuccess({ planId })),
          catchError((error) => of(deleteFitnessPlanFailure({ error: error.message })))
        )
      )
    )
  );
}