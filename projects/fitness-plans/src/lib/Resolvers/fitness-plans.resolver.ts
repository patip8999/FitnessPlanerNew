import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TrainingPlanModel } from '../Models/training-plan.model';
import { loadFitnessPlans } from '../Store/fitness-plans.actions';
import { selectAllFitnessPlans } from '../Store/fitness-plans.selectors';


export const FitnessPlansResolver: ResolveFn<TrainingPlanModel[]> = (): Observable<TrainingPlanModel[]> => {
  const store = inject(Store);

  store.dispatch(loadFitnessPlans());
  return store.select(selectAllFitnessPlans).pipe(
    take(1),
    switchMap((plans) => of(plans))
  );
};