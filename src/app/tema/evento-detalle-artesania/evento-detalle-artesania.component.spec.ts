import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDetalleArtesaniaComponent } from './evento-detalle-artesania.component';

describe('EventoDetalleArtesaniaComponent', () => {
  let component: EventoDetalleArtesaniaComponent;
  let fixture: ComponentFixture<EventoDetalleArtesaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoDetalleArtesaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoDetalleArtesaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
