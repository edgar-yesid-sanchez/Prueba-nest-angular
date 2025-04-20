import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alerta {
  tipo: 'error' | 'success' | 'warning';
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class AlertaGlobalService {
  alerta$ = new BehaviorSubject<Alerta | null>(null);

  mostrar(tipo: 'error' | 'success' | 'warning', mensaje: string) {
    this.alerta$.next({ tipo, mensaje });

    // Cierra después de 4 segundos automáticamente
    setTimeout(() => this.alerta$.next(null), 4000);
  }

  cerrar() {
    this.alerta$.next(null);
  }
}
