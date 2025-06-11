import { Component, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { FitnessPlanService } from './fitness-plans.service';
import {
  TrainingPlanModel,
  TrainingPlanDay,
} from './Models/training-plan.model';

@Component({
  selector: 'app-fitness-plans',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fitness-plans.component.html',
})
export class FitnessPlansComponent   {
  private fitnessPlanService = inject(FitnessPlanService);
  private router = inject(Router);

  plans: TrainingPlanModel[] = [];
  planName: string = '';
  days: TrainingPlanDay[] = [];
  planDescription: string = '';
  constructor() {
    this.loadAllPlans();
  }

  loadAllPlans(): void {
    this.fitnessPlanService.getAllFitnessPlans().subscribe((plans) => {
      console.log('Wszystkie plany:', plans);
      this.plans = plans;
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
      id: this.fitnessPlanService.client.createId(),
      name: this.planName,
      description: this.planDescription,
      days: this.days,
      uid: '',
    };

    this.fitnessPlanService.createFitnessPlan(newPlan);
    this.router.navigate(['/home']);
  }
}
