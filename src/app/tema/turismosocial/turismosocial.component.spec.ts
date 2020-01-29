import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurismosocialComponent } from './turismosocial.component';

describe('TurismosocialComponent', () => {
  let component: TurismosocialComponent;
  let fixture: ComponentFixture<TurismosocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurismosocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurismosocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
