import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-compania',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-compania.component.html',
})
export class DetalleCompaniaComponent {
  @Input() compania: any = null;
  @Output() onClose = new EventEmitter<void>();


  tabSeleccionado: 'usuarios' | 'productos' = 'usuarios';

  cerrar() {
    this.onClose.emit();
  }
}
