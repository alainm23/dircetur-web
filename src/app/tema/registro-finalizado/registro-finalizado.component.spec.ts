import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFinalizadoComponent } from './registro-finalizado.component';

describe('RegistroFinalizadoComponent', () => {
  let component: RegistroFinalizadoComponent;
  let fixture: ComponentFixture<RegistroFinalizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFinalizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
