import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://prueba-nest-angular.onrender.com/auth'; // tu backend

  constructor(private http: HttpClient) {}

  async login(data: { correo: string; password: string }) {
    const res: any = await this.http.post(`${this.api}/login`, data).toPromise();
    localStorage.setItem('token', res.access_token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuarioDesdeToken() {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return {
        correo: decoded.correo,
        rol: decoded.rol,
        userId: decoded.sub,
      };
    } catch (error) {
      return null;
    }
  }
}
