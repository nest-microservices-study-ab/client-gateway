import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const rpcError = exception.getError();
    console.log({ rpcError });

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(Number(rpcError.status))
        ? HttpStatus.BAD_REQUEST
        : rpcError.status;

      return response.status(rpcError.status).json({
        status,
        message: rpcError.message,
      });
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: JSON.stringify(rpcError),
    });
  }
}
