import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CompleterModule } from './modules/completer';
import { CarettrackerModule } from './modules/carettracker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarettrackerModule,
    CompleterModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
