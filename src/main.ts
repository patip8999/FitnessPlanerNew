import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { FitnessPlansEffects } from '../projects/fitness-plans/src/lib/Store/fitness-plans.effects';
import { fitnessPlansReducer } from '../projects/fitness-plans/src/lib/Store/fitness-plans.reducer';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environments';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ fitnessPlans: fitnessPlansReducer }),
    provideEffects([FitnessPlansEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, // dodaj ten provider
  ],
});