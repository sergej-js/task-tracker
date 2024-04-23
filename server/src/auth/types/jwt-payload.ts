import { UserRole } from "@prisma/client";

export type IJwtPayload = {
    sub: number;
    role: UserRole;
}

export type IJwtPayloadWithRefresh = IJwtPayload & {
    refreshToken: string
}