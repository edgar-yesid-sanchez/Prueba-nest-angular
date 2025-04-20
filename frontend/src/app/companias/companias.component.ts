import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniasRequestsService } from './services/companias-requests.service';
import { CompaniaFormComponent } from './compania-form/compania-form.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { DetalleCompaniaComponent } from './detalle-compania/detalle-compania.component';
import { DropdownAccionesComponent } from '../shared/dropdown-acciones/dropdown-acciones.component';
import { ConfirmarAccionComponent } from '../shared/confirmar-accion/confirmar-accion.component';
import { AlertaRespuestaApiComponent } from '../shared/alerta-respuesta-api/alerta-respuesta-api.component';

@Component({
  standalone: true,
  selector: 'app-companias',
  imports: [CommonModule, CompaniaFormComponent, LoaderComponent, DetalleCompaniaComponent, DropdownAccionesComponent, ConfirmarAccionComponent, AlertaRespuestaApiComponent],
  templateUrl: './companias.component.html',
})
export class CompaniasComponent {
  alerta: { tipo: 'error' | 'success', mensaje: string } | null = null;

  companias: any[] | undefined = [];
  
  showForm = false; // Mustra el formulario para crear/editar una compañia
  showDetalle = false; // Muestra el modal para ver los datos completos de la compañia

  loading = true;
  saving = false;

  selectedCompania: any = null;
  
  companiaAEliminar: any;
  alertaConfirmacion: boolean = false;

  constructor(private companiasRequests: CompaniasRequestsService) {}

  async ngOnInit() {
    await this.getCompanias();
  }

  async getCompanias() {
    this.loading = true;
    try {
      this.companias = await this.companiasRequests.getAll();
    } catch (err: any) {
      console.error('Error al consultar', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.loading = false;
    }
  }


  /* Acciones para la tabla */
  getAcciones(compania: any) {
    return [
      { label: 'Ver', action: () => this.verDetalle(compania) },
      { label: 'Editar', action: () => this.editCompania(compania) },
      { label: 'Eliminar', action: () => this.confirmarEliminar(compania) },
    ];
  }


  editCompania(compania: any) {
    this.selectedCompania = compania;
    this.showForm = true;
  }

  async saveCompania(data: any) {
    this.saving = true;
    try {
      if (this.selectedCompania) {
        // Editar
        await this.companiasRequests.update(this.selectedCompania.id, data);
      } else {
        // Crear nuevo
        await this.companiasRequests.create(data);
      }
      await this.getCompanias();
      this.showForm = false;
    }catch (err: any) {
      console.error('Error al guardar', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.saving = false;
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedCompania = null;
  }

  async verDetalle(c: any) {
    try {
      this.showDetalle = true;
      this.loading = true;
  
      const data = await this.companiasRequests.getById(c.id);
      this.selectedCompania = data;
      
    } catch (err: any) {
      console.error('Error al obtener detalles', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.loading = false;
    }
  }

  cerrarDetalle() {
    this.showDetalle = false;
    this.selectedCompania = null;
  }

  agregarCompania(){
    this.selectedCompania = null;
    this.showForm = true;
  }


  /* Eliminar compania */
  confirmarEliminar(producto: any){
    this.companiaAEliminar  = producto
    this.alertaConfirmacion = true;
  }
  async eliminar(){
    try {
      this.saving = true;
      await this.companiasRequests.delete(this.companiaAEliminar.id);
      await this.getCompanias();
    } catch (err: any) {
      console.error('Error al eliminar', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.alertaConfirmacion = false;
      this.saving = false;
      this.companiaAEliminar  = null;
    }
  }
  cancelarEliminar(){
    this.companiaAEliminar  = null;
    this.alertaConfirmacion = false;
  }

  mostrarAlerta(tipo: 'error' | 'success', mensaje: string) {
    this.alerta = { tipo, mensaje };
    setTimeout(() => this.alerta = null, 4000); // autocierra en 4s
  }

}
