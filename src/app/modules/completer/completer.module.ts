import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompleterComponent } from './completer.component';
import { EmphPipe } from './emph.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CompleterComponent, EmphPipe ],
  exports: [ CompleterComponent ]
})
export class CompleterModule { }
