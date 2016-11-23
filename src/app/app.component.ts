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
  log(evt): void { console.log(evt); }
  constructor(private domain: CompleterDomain) {}
}
