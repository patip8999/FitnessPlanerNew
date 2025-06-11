import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { TrainingPlanModel, TrainingPlanDay } from '../../Models/training-plan.model';
import { loadFitnessPlans, createFitnessPlan } from '../../Store/fitness-plans.actions';
import { selectAllFitnessPlans, selectFitnessPlansLoading, selectFitnessPlansError } from '../../Store/fitness-plans.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-fitness-plan',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './CreateFitnessPlans.component.html',
})
export class CreateFitnessPlanComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // BehaviorSubjects dla lokalnego stanu formularza
  private planNameSubject = new BehaviorSubject<string>('');
  private planDescriptionSubject = new BehaviorSubject<string>('');
  private daysSubject = new BehaviorSubject<TrainingPlanDay[]>([]);

  // Publiczne observables do użycia w szablonie
  planName$ = this.planNameSubject.asObservable();
  planDescription$ = this.planDescriptionSubject.asObservable();
  days$ = this.daysSubject.asObservable();
  plans$ = this.store.select(selectAllFitnessPlans);
  loading$ = this.store.select(selectFitnessPlansLoading);
  error$ = this.store.select(selectFitnessPlansError);

  ngOnInit(): void {
    // Ładowanie planów z NgRx Store
    this.store.dispatch(loadFitnessPlans());
    this.plans$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((plans) => {
      console.log('Wszystkie plany:', plans); // TODO: Zastąp loggerem w portfolio
    });
  }

  addDay(): void {
    const currentDays = this.daysSubject.getValue();
    this.daysSubject.next([
      ...currentDays,
      { date: '', videoLink: '', time: '', burnedKcal: 0 },
    ]);
  }

  removeDay(index: number): void {
    const currentDays = this.daysSubject.getValue();
    this.daysSubject.next(currentDays.filter((_, i) => i !== index));
  }

  updatePlanName(name: string): void {
    this.planNameSubject.next(name);
  }

  updatePlanDescription(description: string): void {
    this.planDescriptionSubject.next(description);
  }

  updateDay(index: number, field: keyof TrainingPlanDay, value: string | number): void {
    const currentDays = this.daysSubject.getValue();
    const updatedDays = [...currentDays];
    updatedDays[index] = { ...updatedDays[index], [field]: value };
    this.daysSubject.next(updatedDays);
  }

  savePlan(): void {
    const newPlan: TrainingPlanModel = {
      id: crypto.randomUUID(),
      name: this.planNameSubject.getValue().trim(),
      description: this.planDescriptionSubject.getValue().trim(),
      days: this.daysSubject.getValue(),
      uid: '',
    };

  

    this.store.dispatch(createFitnessPlan({ plan: newPlan }));
  }
}