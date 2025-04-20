import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerta-respuesta-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta-respuesta-api.component.html',
})
export class AlertaRespuestaApiComponent {
  @Input() tipo: 'error' | 'success' | 'warning' = 'error';
  @Input() mensaje: string = '';
  @Output() onClose = new EventEmitter<void>();

  cerrar() {
    this.onClose.emit();
  }
}
