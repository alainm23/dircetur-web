import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitoDetalleComponent } from './circuito-detalle.component';

describe('CircuitoDetalleComponent', () => {
  let component: CircuitoDetalleComponent;
  let fixture: ComponentFixture<CircuitoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
