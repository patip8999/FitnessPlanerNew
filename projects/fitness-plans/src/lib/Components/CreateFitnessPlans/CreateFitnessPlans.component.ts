
import { Component, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { TrainingPlanModel, TrainingPlanDay } from '../../Models/training-plan.model';
import { FitnessPlanService } from '../../Services/fitness-plans.service';
import { Store } from '@ngrx/store';
import { loadFitnessPlans, createFitnessPlan } from '../../Store/fitness-plans.actions';
import { selectFitnessPlansLoading, selectFitnessPlansError, selectAllFitnessPlans } from '../../Store/fitness-plans.selectors';


@Component({
  selector: 'app-fitness-plans',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './CreateFitnessPlans.component.html',
})
export class createFitnessPlanComponent   {
   plans: TrainingPlanModel[] = [];
  planName: string = '';
  days: TrainingPlanDay[] = [];
  planDescription: string = '';
  loading$ = this.store.select(selectFitnessPlansLoading);
  error$ = this.store.select(selectFitnessPlansError);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadFitnessPlans());
    this.store.select(selectAllFitnessPlans).subscribe((plans) => {
      this.plans = plans;
      console.log('Wszystkie plany:', plans);
    });
  }

  addDay(): void {
    this.days.push({
      date: '',
      videoLink: '',
      time: '',
      burnedKcal: 0,
    });
  }

  removeDay(index: number): void {
    this.days.splice(index, 1);
  }

  savePlan(): void {
    const newPlan: TrainingPlanModel = {
      id: crypto.randomUUID(), // Zastępuje client.createId()
      name: this.planName,
      description: this.planDescription,
      days: this.days,
      uid: '',
    };

    this.store.dispatch(createFitnessPlan({ plan: newPlan }));
  }
}