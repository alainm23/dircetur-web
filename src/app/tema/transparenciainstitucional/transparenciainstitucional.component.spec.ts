import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparenciainstitucionalComponent } from './transparenciainstitucional.component';

describe('TransparenciainstitucionalComponent', () => {
  let component: TransparenciainstitucionalComponent;
  let fixture: ComponentFixture<TransparenciainstitucionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransparenciainstitucionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparenciainstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
