import { z } from 'nestjs-zod/z';

export const configSchema = z.object({
	SERVER_PORT: z.coerce.number(),
	JWT_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	CORS: z.boolean(),
});
