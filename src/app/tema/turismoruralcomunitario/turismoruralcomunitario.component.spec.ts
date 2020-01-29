import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurismoruralcomunitarioComponent } from './turismoruralcomunitario.component';

describe('TurismoruralcomunitarioComponent', () => {
  let component: TurismoruralcomunitarioComponent;
  let fixture: ComponentFixture<TurismoruralcomunitarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurismoruralcomunitarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurismoruralcomunitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
