import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlojamientoCartillaComponent } from './alojamiento-cartilla.component';

describe('AlojamientoCartillaComponent', () => {
  let component: AlojamientoCartillaComponent;
  let fixture: ComponentFixture<AlojamientoCartillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlojamientoCartillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlojamientoCartillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
