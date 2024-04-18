import { z } from 'nestjs-zod/z';

export const configSchema = z.object({
	SERVER_PORT: z.coerce.number(),
});
