import { Injectable } from '@angular/core';
import { ProductosApiService } from './productos-api.service';

@Injectable({ providedIn: 'root' })
export class ProductosRequestsService {
  constructor(private api: ProductosApiService) {}

  async getAll(): Promise<any[]> {
    try {
      return await this.api.getAll().toPromise() ?? [];
    } catch (err) {
      console.error('Error al obtener productos', err);
      return [];
    }
  }

  async getById(id: number): Promise<any | null> {
    try {
      return await this.api.getById(id).toPromise();
    } catch (err) {
      console.error('Error al obtener producto por ID', err);
      return null;
    }
  }

  async create(data: any) {
    return await this.api.create(data).toPromise();
  }

  async update(id: number, data: any) {
    return await this.api.update(id, data).toPromise();
  }

  async delete(id: number) {
    return await this.api.delete(id).toPromise();
  }
}
