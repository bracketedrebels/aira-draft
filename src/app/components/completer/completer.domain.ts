import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class CompleterDomain {
    public set  suggestions(aValue: string[]) { this.updateSuggestionsList(aValue); }
    public set  filtrate(aCriterion: string) { this.filtrateSuggestionsList(aCriterion); }

    public onSuggestionsUpdated: Observable<string[]>;

    constructor() {
        this.onSuggestionsUpdated = this.subjectSuggestionsUpdated
            .asObservable()
            .filter( value => !!value )
            .map( value => value.filter( variant => this.filter ? this.filter.test(variant) : true ) )
    }



    private suggestionsList: string[];
    private filter: RegExp;

    private subjectSuggestionsUpdated: BehaviorSubject<string[]> = new BehaviorSubject([]); 

    private updateSuggestionsList(aValue: string[]): void {
        this.suggestionsList = aValue;
        this.subjectSuggestionsUpdated.next(aValue);
    }

    private filtrateSuggestionsList(aCriterion: string): void {
        this.filter = new RegExp(`^.?*${aCriterion}.?*$`);
        this.subjectSuggestionsUpdated.next(this.suggestionsList);
    }
}