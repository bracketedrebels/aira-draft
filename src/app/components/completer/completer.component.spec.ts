/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompleterComponent } from './completer.component';

describe('CompleterComponent', () => {
  let component: CompleterComponent;
  let fixture: ComponentFixture<CompleterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
