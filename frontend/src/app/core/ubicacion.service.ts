import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UbicacionService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getDepartamentos(): Promise<any[]> {
    try {
      const data = await this.http.get<any[]>(`${this.baseUrl}/departamentos`).toPromise();
      return data ?? [];
    } catch (err) {
      console.error('Error al cargar departamentos', err);
      return [];
    }
  }
  
  async getCiudadesByDepartamento(departamentoId: number): Promise<any[]> {
    try {
      const data = await this.http.get<any[]>(`${this.baseUrl}/ciudades/por-departamento?departamentoId=${departamentoId}`).toPromise();
      return data ?? [];
    } catch (err) {
      console.error('Error al cargar ciudades', err);
      return [];
    }
  }


}
