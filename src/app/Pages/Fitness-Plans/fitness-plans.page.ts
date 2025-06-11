import { Component, inject } from "@angular/core";
import { CreateFitnessPlanComponent } from "../../../../projects/fitness-plans/src/lib/Components/CreateFitnessPlans/CreateFitnessPlans.component";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { TrainingPlanModel } from "../../../../projects/fitness-plans/src/lib/Models/training-plan.model";
import { selectFitnessPlansLoading, selectFitnessPlansError } from "../../../../projects/fitness-plans/src/lib/Store/fitness-plans.selectors";
import { CommonModule } from "@angular/common";


@Component({
  standalone: true,
  templateUrl: './fitness-plans.page.html',
  imports: [CreateFitnessPlanComponent, CommonModule],

})

export class FitnessPlansPageComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  plans: TrainingPlanModel[] = this.route.snapshot.data['plans'] || [];
  loading$ = this.store.select(selectFitnessPlansLoading);
  error$ = this.store.select(selectFitnessPlansError);
}