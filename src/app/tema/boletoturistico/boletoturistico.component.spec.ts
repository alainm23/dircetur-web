import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoturisticoComponent } from './boletoturistico.component';

describe('BoletoturisticoComponent', () => {
  let component: BoletoturisticoComponent;
  let fixture: ComponentFixture<BoletoturisticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoturisticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletoturisticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
