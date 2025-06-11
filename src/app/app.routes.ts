import { Routes } from '@angular/router';
import { FitnessPlansPageComponent } from './Pages/Fitness-Plans/fitness-plans.page';
import { FitnessPlansPageModule } from './Pages/Fitness-Plans/fitness-plans.module';

export const routes: Routes = [
    {
        path: 'fitness-plans',
        component: FitnessPlansPageModule
    }
];
