import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async register(userDto: any) {
    const hashed = await bcrypt.hash(userDto.password, 10);
    const user = await this.usuarioService.create({
      ...userDto,
      password: hashed,
    });
    return this.generateToken(user);
  }

  async login(correo: string, password: string) {
    const user = await this.usuarioService.findByEmail(correo);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales no validas');
    }
    return this.generateToken(user);
  }

  private generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({ sub: user.id, rol: user.rol, correo: user.correo, }),
    };
  }
}
