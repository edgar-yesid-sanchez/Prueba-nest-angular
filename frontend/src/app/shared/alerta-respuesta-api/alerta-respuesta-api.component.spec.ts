import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaRespuestaApiComponent } from './alerta-respuesta-api.component';

describe('AlertaRespuestaApiComponent', () => {
  let component: AlertaRespuestaApiComponent;
  let fixture: ComponentFixture<AlertaRespuestaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaRespuestaApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaRespuestaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
