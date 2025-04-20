import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-accion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmar-accion.component.html',
})
export class ConfirmarAccionComponent {
  @Input() mensaje: string = '¿Estás seguro?';
  @Input() detalle: string = '';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirmar() {
    this.onConfirm.emit();
  }

  cancelar() {
    this.onCancel.emit();
  }
}
