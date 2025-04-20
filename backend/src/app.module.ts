import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { CompaniasModule } from './companias/companias.module';
import { ProductosModule } from './productos/productos.module';
import { SeedModule } from './seed/seed.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false, // 👈 importante, desactiva si usas DB sin SSL
    }),
    TypeOrmModule.forFeature([Usuario]), // para usar el repositorio de Usuario en el módulo de Auth
    AuthModule, DepartamentosModule, CiudadesModule, CompaniasModule, ProductosModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
