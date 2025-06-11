import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import {  CreateFitnessPlanComponent } from "../../projects/fitness-plans/src/lib/Components/CreateFitnessPlans/CreateFitnessPlans.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CreateFitnessPlanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
