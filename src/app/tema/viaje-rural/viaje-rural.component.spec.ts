import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeRuralComponent } from './viaje-rural.component';

describe('ViajeRuralComponent', () => {
  let component: ViajeRuralComponent;
  let fixture: ComponentFixture<ViajeRuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeRuralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeRuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
