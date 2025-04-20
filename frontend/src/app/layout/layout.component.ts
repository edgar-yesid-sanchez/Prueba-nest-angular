import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { CommonModule } from '@angular/common';
import { AlertaGlobalService, Alerta } from '../shared/alerta-global.service';
import { AlertaRespuestaApiComponent } from '../shared/alerta-respuesta-api/alerta-respuesta-api.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [CommonModule, RouterModule,AlertaRespuestaApiComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  alerta: Alerta | null = null;
  usuarioActual: any = null;
  sidebarOpen = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    public alertaService: AlertaGlobalService
  ) {}

  ngOnInit() {

    this.alertaService.alerta$.subscribe(alerta => {
      this.alerta = alerta;
    });

    this.usuarioActual = this.auth.getUsuarioDesdeToken();
    console.log(this.usuarioActual)
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}