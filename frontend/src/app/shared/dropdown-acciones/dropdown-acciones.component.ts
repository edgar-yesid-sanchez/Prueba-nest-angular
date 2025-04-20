import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-acciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-acciones.component.html',
})
export class DropdownAccionesComponent {
  @Input() acciones: { label: string; action: () => void }[] = [];
  @Input() icon: string = '⋮';
  abierto = false;

  toggle() {
    this.abierto = !this.abierto;
  }

  ejecutar(accion: () => void) {
    accion();
    this.abierto = false;
  }

  cerrar() {
    this.abierto = false;
  }
}
