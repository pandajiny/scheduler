import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       // ignoreExpiration: false,
//       secretOrKey: 'secr',
//     });
//   }

//   async validate(payload: JwtPayload): Promise<JwtPayload> {
//     // console.log(`jwt token validated`, payload.email);
//     return payload;
//   }
// }
