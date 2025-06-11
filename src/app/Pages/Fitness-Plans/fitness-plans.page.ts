import { Component } from "@angular/core";
import { CreateFitnessPlanComponent } from "../../../../projects/fitness-plans/src/lib/Components/CreateFitnessPlans/CreateFitnessPlans.component";


@Component({
  standalone: true,
  templateUrl: './fitness-plans.page.html',
  imports: [CreateFitnessPlanComponent],

})

export class FitnessPlansPageComponent {

}