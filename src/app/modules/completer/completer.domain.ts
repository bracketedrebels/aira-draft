import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { SuggestionsFiltrationDescription } from './completer.domain.interfaces';

@Injectable()
export class CompleterDomain {
    public set  suggestions(aValue: string[]) { this.updateSuggestionsList(aValue); }
    public      filtrate(aCriterion: string) { this.filtrateSuggestionsList(aCriterion); }

    public onSuggestionsUpdated: Observable<SuggestionsFiltrationDescription>;

    constructor() {
        this.onSuggestionsUpdated = this.subjectSuggestionsUpdated
        .asObservable()
        .filter( value => !!value.suggestions )
        .map( value => ({
            suggestions: value.suggestions.filter( variant => value.filter ? value.filter.test(variant) : true ),
            filter: value.filter
        }) );
    }



    private suggestionsList: string[];
    private filter: RegExp;

    private subjectSuggestionsUpdated: BehaviorSubject<SuggestionsFiltrationDescription> = new BehaviorSubject({
        suggestions: [],
        filter: null
    });

    private updateSuggestionsList(aValue: string[]): void {
        this.suggestionsList = aValue;
        this.subjectSuggestionsUpdated.next({
            suggestions: aValue,
            filter: null
        });
    }

    private filtrateSuggestionsList(aCriterion: string): void {
        let lFilter = new RegExp(`(^.*?)(${aCriterion.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})(.*?$)`);
        this.subjectSuggestionsUpdated.next({
            suggestions: this.suggestionsList,
            filter: lFilter
        });
    }
}
