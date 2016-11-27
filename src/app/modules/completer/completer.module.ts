import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompleterComponent } from './completer.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CompleterComponent ],
  exports: [ CompleterComponent ]
})
export class CompleterModule { }
