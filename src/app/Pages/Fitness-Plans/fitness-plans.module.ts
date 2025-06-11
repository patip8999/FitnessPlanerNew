import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FitnessPlansPageComponent } from './fitness-plans.page';


const routes: Routes = [
  {
    path: '',
    component: FitnessPlansPageComponent,
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