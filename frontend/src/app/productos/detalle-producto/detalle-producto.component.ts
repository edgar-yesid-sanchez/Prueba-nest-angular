import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.component.html',
})
export class DetalleProductoComponent {
  @Input() producto: any;
  @Output() onClose = new EventEmitter<void>();

  cerrar() {
    this.onClose.emit();
  }
}