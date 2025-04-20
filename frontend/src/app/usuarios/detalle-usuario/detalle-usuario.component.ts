import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-usuario.component.html',
})
export class DetalleUsuarioComponent {
  @Input() usuario: any;
  @Output() onClose = new EventEmitter<void>();

  cerrar() {
    this.onClose.emit();
  }
}
