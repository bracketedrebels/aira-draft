import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CompleterComponent } from './components/completer';
import { CarettrackerModule } from './modules/carettracker';

@NgModule({
  declarations: [
    AppComponent,
    CompleterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarettrackerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
