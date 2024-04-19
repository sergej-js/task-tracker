import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Config } from './common/config/config';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	app.enableShutdownHooks();

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

	const configService = app.get<ConfigService<Config, true>>(ConfigService);

	if (configService.get('CORS')) {
		app.enableCors();
	}

	app.setGlobalPrefix('api');

	await app.listen(process.env.PORT || configService.get('SERVER_PORT') || 3000);
}
bootstrap();
