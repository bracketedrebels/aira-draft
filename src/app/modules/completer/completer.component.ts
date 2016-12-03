import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { CompleterDomain } from './completer.domain';

@Component({
  selector: 'aira-completer',
  templateUrl: './completer.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CompleterComponent implements OnInit, OnDestroy {
  public suggestions: string[] = [];
  public criterion: RegExp;

  constructor(private domain: CompleterDomain) { }

  public ngOnInit(): void {
    this.subscriptionOnSuggestionsUpdated = this.domain.onSuggestionsUpdated
        .subscribe( value => {
          this.suggestions = value.suggestions;
          this.criterion = value.filter;
        } );
  }

  public ngOnDestroy(): void {
    this.subscriptionOnSuggestionsUpdated.unsubscribe();
  }



  private subscriptionOnSuggestionsUpdated: Subscription;
}
