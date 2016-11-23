import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { CompleterDomain } from './completer.domain';

@Component({
  selector: 'airadraft-completer',
  templateUrl: './completer.component.html',
  styleUrls: ['./completer.component.scss']
})
export class CompleterComponent implements OnInit, OnDestroy {
  public suggestions: string[] = [];

  constructor(private domain: CompleterDomain) { }

  public ngOnInit(): void {
    this.subscriptionOnSuggestionsUpdated = this.domain.onSuggestionsUpdated
        .subscribe( value => this.suggestions = value );
  }

  public ngOnDestroy(): void {
    this.subscriptionOnSuggestionsUpdated.unsubscribe();
  }



  private subscriptionOnSuggestionsUpdated: Subscription; 
}
