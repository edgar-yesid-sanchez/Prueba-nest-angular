import { Component, OnInit } from '@angular/core';
import { ProductosRequestsService } from './services/productos-requests.service';
import { CommonModule } from '@angular/common';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { DropdownAccionesComponent } from '../shared/dropdown-acciones/dropdown-acciones.component';
import { ConfirmarAccionComponent } from '../shared/confirmar-accion/confirmar-accion.component';
import { AlertaRespuestaApiComponent } from '../shared/alerta-respuesta-api/alerta-respuesta-api.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoFormComponent, LoaderComponent, DetalleProductoComponent, DropdownAccionesComponent, ConfirmarAccionComponent, AlertaRespuestaApiComponent],
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {

  alerta: { tipo: 'error' | 'success', mensaje: string } | null = null;

  productos: any[] = [];
  loading = false;
  showForm = false;

  selectedProducto: any = null;
  saving = false;

  showDetalle: boolean = false;
  productoDetalle: any;

  alertaConfirmacion: boolean = false
  productoAEliminar: any = null;

  constructor(private productoRequests: ProductosRequestsService) {}

  async ngOnInit() {
    await this.getProductos();
  }

  async getProductos() {
    this.loading = true;
    try {
      this.productos = await this.productoRequests.getAll();
    } catch (err: any) {
      console.error('Error al cargar productos', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.loading = false;
    }
  }


  /* Abrir modal para crear */
  agregarProducto() {
    this.selectedProducto = null;
    this.showForm = true;
  }

  closeForm() {
    this.selectedProducto = null;
    this.showForm = false;
  }

  async saveProducto(data: any) {
    this.saving = true;
    try {
      if (this.selectedProducto) {
        await this.productoRequests.update(this.selectedProducto.id, data);
      } else {
        await this.productoRequests.create(data);
      }
      await this.getProductos();
      this.closeForm();
    } catch (err: any) {
      console.error('Error al guardar producto', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.saving = false;
    }
  }

  /* Acciones para la tabla */
  getAcciones(producto: any) {
    return [
      { label: 'Ver', action: () => this.verDetalle(producto) },
      { label: 'Editar', action: () => this.editProducto(producto) },
      { label: 'Eliminar', action: () => this.confirmarEliminar(producto) },
    ];
  }
  
  async verDetalle(producto: any) {
    try {
      this.showDetalle = true;
      this.loading = true;
  
      const data = await this.productoRequests.getById(producto.id);
      this.productoDetalle = data;
    } catch (err: any) {
      console.error('Error al obtener detalles', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.loading = false;
    }
  }

  cerrarDetalle() {
    this.showDetalle = false;
    this.productoDetalle = null;
  }

  editProducto(producto: any) {
    this.selectedProducto = producto;
    this.showForm = true;
  }
  

  
  confirmarEliminar(producto: any){
    this.productoAEliminar  = producto
    this.alertaConfirmacion = true;
  }
  async eliminarProducto(){
    try {
      this.saving = true;
      await this.productoRequests.delete(this.productoAEliminar.id);
      await this.getProductos();
      this.alertaConfirmacion = false;
    }catch (err: any) {
      console.error('Error al obtener detalles', err);
      this.mostrarAlerta('error', err?.error?.message || 'Error desconocido');
    } finally {
      this.saving = false;
      this.productoAEliminar = null
      this.alertaConfirmacion = false;
    }
  }
  cancelarEliminar(){
    this.productoAEliminar  = null;
    this.alertaConfirmacion = false;
  }


    
  mostrarAlerta(tipo: 'error' | 'success', mensaje: string) {
    this.alerta = { tipo, mensaje };
    setTimeout(() => this.alerta = null, 4000); // autocierra en 4s
  }


}
