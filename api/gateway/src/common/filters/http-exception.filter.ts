import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // jika exception adalah HttpException (termasuk dari axios interceptor)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // jika response sudah berbentuk object (dari service backend)
      if (typeof exceptionResponse === 'object') {
        return response.status(status).json(exceptionResponse);
      }

      // jika response berupa string
      return response.status(status).json({
        success: false,
        message: exceptionResponse,
        metadata: { status },
      });
    }

    // jika exception bukan HttpException (error tidak terduga)
    console.error('Unhandled Exception:', exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      metadata: { status: HttpStatus.INTERNAL_SERVER_ERROR },
    });
  }
}
