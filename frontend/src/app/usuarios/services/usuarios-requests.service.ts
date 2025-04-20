import { Injectable } from '@angular/core';
import { UsuariosApiService } from './usuarios-api.service';

@Injectable({ providedIn: 'root' })
export class UsuariosRequestsService {
  constructor(private api: UsuariosApiService) {}

  async getAll(): Promise<any[]> {
    try {
      return await this.api.getAll().toPromise() ?? [];
    } catch (err) {
      console.error('Error al obtener usuarios', err);
      return [];
    }
  }

  async getById(id: number): Promise<any | null> {
    try {
      return await this.api.getById(id).toPromise();
    } catch (err) {
      console.error('Error al obtener usuario por ID', err);
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
