import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof exceptionResponse === 'string'
      ? { message: exceptionResponse }
      : (exceptionResponse as any);

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: error.message || error,
      errors: error.errors || null,
      timestamp: new Date().toISOString(),
    });
  }
}
