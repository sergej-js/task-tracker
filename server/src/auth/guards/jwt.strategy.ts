import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Config } from "src/common/config/config";
import { PrismaService } from "src/common/database/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly prismaService: PrismaService, public readonly configService: ConfigService<Config, true>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: { email: string }) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: payload.email
            }
        })

        delete user.password;
        return user;
    }

}