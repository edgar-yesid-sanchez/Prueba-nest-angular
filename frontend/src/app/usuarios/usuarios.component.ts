import { Component } from '@angular/core';
import { UsuariosRequestsService } from './services/usuarios-requests.service';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '../shared/loader/loader.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { DropdownAccionesComponent } from '../shared/dropdown-acciones/dropdown-acciones.component';
import { ConfirmarAccionComponent } from '../shared/confirmar-accion/confirmar-accion.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { AlertaRespuestaApiComponent } from '../shared/alerta-respuesta-api/alerta-respuesta-api.component';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, UsuarioFormComponent, LoaderComponent, DetalleUsuarioComponent, DropdownAccionesComponent, ConfirmarAccionComponent,AlertaRespuestaApiComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  alerta: { tipo: 'error' | 'success', mensaje: string } | null = null;

  loading: boolean = false;
  saving: boolean = false;

  usuarios: any[] = [];

  selectedUsuario: any = null;
  showForm: boolean = false;
  
  showDetalle: boolean = false;
  usuarioDetalle: any;

  usuarioAEliminar: any = null;
  alertaConfirmacion: boolean = false;

  constructor(private requests: UsuariosRequestsService) {}

  async ngOnInit() {
    await this.getUsuarios();
  }

  async getUsuarios() {
    this.loading = true;
    try {
      this.usuarios = await this.requests.getAll();
    } catch (err) {
      console.error('Error al obtener usuarios', err);
    } finally {
      this.loading = false;
    }
  }

  getAcciones(usuario: any) {
    return [
      { label: 'Ver', action: () => this.verDetalle(usuario) },
      { label: 'Editar', action: () => this.editUsuario(usuario) },
      { label: 'Eliminar', action: () => this.confirmarEliminar(usuario) },
    ];
  }

  /* Abrir modal para crear */
  agregar() {
    this.selectedUsuario = null;
    this.showForm = true;
  }

 /* Abrir modal para editar */
  editUsuario(usuario: any) {
    this.selectedUsuario = usuario;
    this.showForm = true;
  }

  closeForm() {
    this.selectedUsuario = null;
    this.showForm = false;
  }

  async saveUsuario(data: any) {
    this.saving = true;
    try {
      if (this.selectedUsuario) {
        await this.requests.update(this.selectedUsuario.id, data);
      } else {
        await this.requests.create(data);
      }

      await this.getUsuarios();
      this.closeForm();
    } catch (err: any) {
      console.error('Error al guardar usuario', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.saving = false;
    }
  }

  async verDetalle(usuario: any) {
    try {
      this.showDetalle = true;
      this.usuarioDetalle = await this.requests.getById(usuario.id);
    } catch (err: any) {
      console.error('Error al obtener detalles', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    }
  }

  cerrarDetalle() {
    this.showDetalle = false;
    this.usuarioDetalle = null;
  }

  /* Eliminar */
  confirmarEliminar(producto: any){
    this.usuarioAEliminar  = producto
    this.alertaConfirmacion = true;
  }
  async eliminar(){
    try {
      await this.requests.delete(this.usuarioAEliminar.id);
      await this.getUsuarios();
      this.alertaConfirmacion = false;
    }catch (err: any) {
      console.error('Error al elimianr', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.usuarioAEliminar = null
      this.alertaConfirmacion = false;
    }
  }
  cancelarEliminar(){
    this.usuarioAEliminar  = null;
    this.alertaConfirmacion = false;
  }
  
  mostrarAlerta(tipo: 'error' | 'success', mensaje: string) {
    this.alerta = { tipo, mensaje };
    setTimeout(() => this.alerta = null, 4000); // autocierra en 4s
  }


}
