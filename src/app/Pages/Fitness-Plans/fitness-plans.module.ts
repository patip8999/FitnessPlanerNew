import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FitnessPlansPageComponent } from './fitness-plans.page';
import { FitnessPlansResolver } from '../../../../projects/fitness-plans/src/lib/Resolvers/fitness-plans.resolver';



const routes: Routes = [
  {
    path: '',
    component: FitnessPlansPageComponent,
    resolve: { plans: FitnessPlansResolver },
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class FitnessPlansPageModule {}