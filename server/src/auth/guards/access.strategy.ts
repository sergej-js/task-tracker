import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Config } from "src/common/config/config";
import { IJwtPayload } from "../types/jwt-payload";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(public readonly configService: ConfigService<Config, true>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: IJwtPayload) {
        return payload;
    }

}