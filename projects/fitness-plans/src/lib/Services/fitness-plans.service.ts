import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, switchMap, tap } from 'rxjs';
import { TrainingPlanModel } from '../Models/training-plan.model';


@Injectable({
  providedIn: 'root',
})
export class FitnessPlanService {
  client = inject(AngularFirestore);

  getAllFitnessPlans(): Observable<TrainingPlanModel[]> {
    return this.client
      .collection<TrainingPlanModel>('FitnessPlans')
      .valueChanges();
  }

  createFitnessPlan(plan: TrainingPlanModel): Observable<void> {
    const newPlan = { ...plan };
    return from(
      this.client
        .collection('FitnessPlans')
        .add(newPlan)
        .then(() => console.log('Plan fitness dodany'))
        .catch((err) => {
          console.error('Błąd przy dodawaniu planu fitness', err);
          throw err;
        })
    );
  }

  getFitnessPlanById(planId: string): Observable<TrainingPlanModel | undefined> {
    return this.client
      .collection<TrainingPlanModel>('FitnessPlans', (ref) =>
        ref.where('id', '==', planId)
      )
      .valueChanges()
      .pipe(
        map((plans) => (plans.length > 0 ? plans[0] : undefined)),
        tap((plan) => {
          console.log('Fetched Plan Data from Firestore:', plan);
        }),
        map((plan) => {
          if (plan) {
            return plan;
          } else {
            console.log('Brak planu dla podanego ID:', planId);
            return undefined;
          }
        })
      );
  }

  updateFitnessPlan(plan: TrainingPlanModel): Observable<void> {
    return this.client
      .collection('FitnessPlans', (ref) => ref.where('id', '==', plan.id))
      .get()
      .pipe(
        switchMap((querySnapshot) => {
          const batch = this.client.firestore.batch();
          querySnapshot.forEach((doc) => {
            const docRef = this.client.firestore.collection('FitnessPlans').doc(doc.id);
            batch.update(docRef, plan);
          });
          return from(batch.commit());
        })
      );
  }

  deleteFitnessPlan(planId: string): Observable<void> {
    return this.client
      .collection('FitnessPlans', (ref) => ref.where('id', '==', planId))
      .get()
      .pipe(
        switchMap((querySnapshot) => {
          const batch = this.client.firestore.batch();
          querySnapshot.forEach((doc) => {
            const docRef = this.client.firestore.collection('FitnessPlans').doc(doc.id);
            batch.delete(docRef);
          });
          return from(batch.commit()).pipe(
            tap(() => console.log('Plan fitness usunięty')),
            catchError((err) => {
              console.error('Błąd przy usuwaniu planu fitness', err);
              throw err;
            })
          );
        })
      );
  }
}