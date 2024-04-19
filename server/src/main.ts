import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Config } from './common/config/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	app.enableShutdownHooks();

	const configService = app.get<ConfigService<Config, true>>(ConfigService);

	if (configService.get('CORS')) {
		app.enableCors();
	}

	app.setGlobalPrefix('api');

	await app.listen(process.env.PORT || configService.get('SERVER_PORT') || 3000);
}
bootstrap();
