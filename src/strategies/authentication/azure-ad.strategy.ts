import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { getEnv } from 'src/utils/config/get-env';

export const AZURE_AD_STRATEGY_KEY = 'AzureAD';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  Strategy,
  AZURE_AD_STRATEGY_KEY,
) {
  constructor() {
    const {
      azureActiveDirectory: { tenantId, clientId },
    } = getEnv();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: clientId,
      issuer: `https://sts.windows.net/${tenantId}/`,
      algorithms: ['RS256'],
      ignoreExpiration: true,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
      }),
    });
  }

  validate(payload: any) {
    return payload;
  }
}
