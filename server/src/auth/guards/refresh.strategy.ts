import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Config } from "src/common/config/config";
import { IJwtPayload } from "../types/jwt-payload";
import { REFRESH_UNDEFINED_ERROR } from "../consts";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {

    constructor(public readonly configService: ConfigService<Config, true>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: IJwtPayload) {
        const refreshToken = req?.get('Authorization')?.replace('Bearer', '').trim();
        
        if (!refreshToken) throw new ForbiddenException(REFRESH_UNDEFINED_ERROR);
        
        return { refreshToken, ...payload };
    }

}