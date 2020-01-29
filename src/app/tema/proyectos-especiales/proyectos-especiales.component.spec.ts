import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosEspecialesComponent } from './proyectos-especiales.component';

describe('ProyectosEspecialesComponent', () => {
  let component: ProyectosEspecialesComponent;
  let fixture: ComponentFixture<ProyectosEspecialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosEspecialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
