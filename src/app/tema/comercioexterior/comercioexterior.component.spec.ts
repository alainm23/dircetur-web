import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercioexteriorComponent } from './comercioexterior.component';

describe('ComercioexteriorComponent', () => {
  let component: ComercioexteriorComponent;
  let fixture: ComponentFixture<ComercioexteriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComercioexteriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercioexteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
