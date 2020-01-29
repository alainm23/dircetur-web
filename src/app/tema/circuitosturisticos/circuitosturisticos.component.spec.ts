import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitosturisticosComponent } from './circuitosturisticos.component';

describe('CircuitosturisticosComponent', () => {
  let component: CircuitosturisticosComponent;
  let fixture: ComponentFixture<CircuitosturisticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitosturisticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitosturisticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
