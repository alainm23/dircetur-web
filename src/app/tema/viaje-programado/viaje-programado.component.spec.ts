import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeProgramadoComponent } from './viaje-programado.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ViajeProgramadoComponent', () => {
  let component: ViajeProgramadoComponent;
  let fixture: ComponentFixture<ViajeProgramadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeProgramadoComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeProgramadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
