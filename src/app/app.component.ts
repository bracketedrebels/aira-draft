import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CompleterDomain } from './modules/completer';
import { CaretOffset } from './modules/carettracker';

@Component({
  selector: 'aira-draft',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CompleterDomain ]
})
export class AppComponent implements OnInit, OnDestroy {
  public completerStyle = { left: 0, top: 0, display: 'none', position: 'absolute' };
  public updateCompleterPosition(aEvent: CaretOffset): void { this.completerStyle = Object.assign({}, this.completerStyle, {
    top: `${aEvent.top}px`,
    left: `${aEvent.left}px`
  }); }
  public filtrate(aEvent: KeyboardEvent): void { this.domain.filtrate(aEvent.key); }

  constructor(
    private domain: CompleterDomain
  ) {
    domain.suggestions = ['###', 'alohomora', '1gg343h', 'set it free'];
  }

  public ngOnInit(): void {
    this.subscriptionOnSuggestionsUpdated = this.domain.onSuggestionsUpdated.subscribe( sugs =>
      this.completerStyle = Object.assign({}, this.completerStyle, { display: sugs.length ? 'block' : 'none' }));
  }

  public ngOnDestroy(): void {
    this.subscriptionOnSuggestionsUpdated.unsubscribe();
  }



  private subscriptionOnSuggestionsUpdated: Subscription;
}
