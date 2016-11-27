import { Directive, ElementRef, Output, EventEmitter,
         OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { CaretOffset, Configuration } from './carettracker.directive.interfaces';


@Directive({
  selector: '[carettracker]'
})
export class CarettrackerDirective implements OnInit, OnDestroy {
  @Output('carettracker') offset: EventEmitter<CaretOffset> = new EventEmitter<CaretOffset>();
  @Input('carettracker')  config: Configuration = { debounce: 100 };  

  public    ngOnInit(): void { this.normalizeConfig(); this.attachListeners(); }
  public    ngOnDestroy(): void { this.detatchListeners(); }
  constructor( elemref: ElementRef ) { this.element = elemref.nativeElement; }



  private element: HTMLElement;
  private tracker: HTMLSpanElement;

  private subscriptionOnKeyPress: Subscription;
  private subscriptionOnKeyDown: Subscription;
  private subscriptionOnClick: Subscription;

  private normalizeConfig(): void {
    let lTrackConfig = {};
    this.config.track = this.config.track || lTrackConfig;
    if (this.config.track === lTrackConfig) {
      Object.assign(this.config.track, {
        printables: true,
        keyboardmove: true,
        mousemove: true,
        backspace: true
      });
    }
    this.config.debounce = Number.isNaN(Number(this.config.debounce)) ? 100 : Number(this.config.debounce);
  }

  private attachListeners(): void {
    this.attachToKeypressIfRequired();
    this.attachToKeydownIfRequired();
    this.attachToClickIfRequired();
  }

  private detatchListeners(): void {
    this.subscriptionOnKeyPress.unsubscribe();
    this.subscriptionOnKeyDown.unsubscribe();
    this.subscriptionOnClick.unsubscribe();
  }

  private attachToKeypressIfRequired(): void {
    let lKeyPressObservable = this.createEventObservable<KeyboardEvent>('keypress');

    if (typeof this.config.track === 'string') {
      lKeyPressObservable = lKeyPressObservable
        .filter( event => this.config.track.toString().includes(String.fromCharCode(event.charCode)) )
    }
    this.subscriptionOnKeyPress = this.createFinalSubscription(lKeyPressObservable);
  }

  private attachToKeydownIfRequired(): void {
    if ( typeof this.config.track === 'object' ) {
      if ( this.config.track.keyboardmove || this.config.track.backspace ) {
        let lObservable = this.createEventObservable<KeyboardEvent>('keydown');
        let lMoveCodes = [];
        if ( this.config.track.keyboardmove ) {
          lMoveCodes.push('ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight');
        }
        if ( this.config.track.backspace ) {
          lMoveCodes.push('Backspace');
        }
        lObservable = lObservable.filter( evt => lMoveCodes.indexOf(evt.key) >= 0 );
        this.subscriptionOnKeyDown = this.createFinalSubscription(lObservable);
      }
    }
  }

  private attachToClickIfRequired(): void {
    if ( typeof this.config.track === 'object' && this.config.track.mousemove ) { 
      this.subscriptionOnClick = this.createFinalSubscription(
        this.createEventObservable<MouseEvent>('click')
      );
    }
  }

  private createEventObservable<T>(anEvent: string): Observable<T> {
    return Observable.fromEvent(this.element, anEvent, (evt: T) => evt);
  }

  private createFinalSubscription(obs: Observable<any>): Subscription {
    return obs.debounceTime( this.config.debounce)
      .do( () => this.updateCaretTracker() )
      .map( () => this.getCaretTrackerOffset() )
      .distinctUntilChanged( (a, b) => a.left === b.left && a.top === b.top )
      .subscribe( offset => this.offset.emit(offset) );
  }

  private createTracker(): HTMLSpanElement {
    let lTracker = document.createElement('span');
    lTracker.style.visibility = 'hidden !important';
    lTracker.style.height = '0 !important';
    lTracker.style.width = '0 !important';
    return this.tracker = lTracker;
  }

  private getTracker(): HTMLSpanElement {
    return this.tracker || this.createTracker();
  }

  private updateCaretTracker(): void {
    let lTracker = this.getTracker();
    let lRange: Range;
    if (window.getSelection && window.getSelection().getRangeAt) {
      lRange = window.getSelection().getRangeAt(0); 
    } else if (document['selection'] && document['selection'].createRange) {
      lRange = document['selection'].createRange();
    }
    lRange.insertNode(lTracker);
  }

  private getCaretTrackerOffset(): CaretOffset | null {
    let lRect = this.getTracker().getBoundingClientRect();
    return { top: lRect.top, left: lRect.left };
  }
}
