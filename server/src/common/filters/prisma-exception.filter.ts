import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { CONFLICT_ERROR_MESSAGE } from './consts';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        Logger.error(exception.message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const message = exception.message.replace(/\n/g, '');

        switch (exception.code) {
            case 'P2002': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: CONFLICT_ERROR_MESSAGE,
                });
                break;
            }
            default:
                super.catch(exception, host);
                break;
        }
    }
}