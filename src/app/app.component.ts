import { Component, ViewEncapsulation } from '@angular/core';

import { CompleterDomain } from './components/completer';

@Component({
  selector: 'airadraft',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CompleterDomain ]
})
export class AppComponent {
  public processInput(aEvent: Event): void {
    console.log(aEvent);
  }

  public handleKeyPress(aEvent: Event): void {
    console.log(aEvent);
  }

  constructor(private domain: CompleterDomain) {}
}
