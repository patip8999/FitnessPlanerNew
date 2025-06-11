import { Routes } from '@angular/router';
import { FitnessPlansPageComponent } from './Pages/Fitness-Plans/fitness-plans.page';
import { FitnessPlansPageModule } from './Pages/Fitness-Plans/fitness-plans.module';
import { FitnessPlansResolver } from '../../projects/fitness-plans/src/lib/Resolvers/fitness-plans.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'fitness-plans',
    pathMatch: 'full',
  },
  {
    path: 'fitness-plans',
    resolve: [FitnessPlansResolver],
    loadChildren: () => import('./Pages/Fitness-Plans/fitness-plans.module').then(m => m.FitnessPlansPageModule),
  },
  {
    path: '**',
    redirectTo: 'fitness-plans',
  },
];