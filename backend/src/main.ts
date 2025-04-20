import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpErrorFilter } from './common/filters/http-exception.filter';
import { SeedModule } from './seed/seed.module';
import { SeederService } from './seed/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
  .setTitle('FletX API')
  .setDescription('Documentación para el manejo de la API de prueba')
  .setVersion('1.0')
  .addBearerAuth() // Añadir autenticación Bearer
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // acceso en /api

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`);

  app.useGlobalFilters(new HttpErrorFilter());

  // Configuración de CORS
  app.enableCors({  origin: '*' }); // Cambia '*' por la URL de tu frontend en producción


  //SEEDER crea unos datos iniciles para la base de datos
  // Si quieres ejecutar el seeder, descomenta las siguientes líneas:
    // const seeder = app.select(SeedModule).get(SeederService);
    // await seeder.seed();

}
bootstrap();
