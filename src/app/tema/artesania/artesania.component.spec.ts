import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtesaniaComponent } from './artesania.component';

describe('ArtesaniaComponent', () => {
  let component: ArtesaniaComponent;
  let fixture: ComponentFixture<ArtesaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtesaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtesaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
