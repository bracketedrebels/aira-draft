import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarettrackerDirective } from './carettracker.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CarettrackerDirective ],
  exports: [ CarettrackerDirective ]
})
export class CarettrackerModule { }
