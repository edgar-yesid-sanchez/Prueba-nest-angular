import { Injectable } from '@angular/core';
import { CompaniasService } from './companias.service';

@Injectable({ providedIn: 'root' })
export class CompaniasRequestsService {
  constructor(private companiasApi: CompaniasService) {}

  async getAll() {
    try {
      return await this.companiasApi.getAll().toPromise();
    } catch (err) {
      console.error('Error al obtener compañías', err);
      throw err;
    }
  }

  async create(data: any) {
    try {
      return await this.companiasApi.create(data).toPromise();
    } catch (err) {
      console.error('Error al crear compañía', err);
      throw err;
    }
  }

  async update(id: number, data: any) {
    try {
      return await this.companiasApi.update(id, data).toPromise();
    } catch (err) {
      console.error('Error al actualizar compañía', err);
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await this.companiasApi.delete(id).toPromise();
    } catch (err) {
      console.error('Error al eliminar compañía', err);
      throw err;
    }
  }

  getById(id: number): Promise<any> {
    try {
      return this.companiasApi.detaill(id).toPromise();
    } catch (err) {
      console.error('Error al eliminar compañía', err);
      throw err;
    }
  }
}
