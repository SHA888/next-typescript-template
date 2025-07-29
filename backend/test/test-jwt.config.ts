import { JwtModuleOptions } from '@nestjs/jwt';
import { TEST_JWT_SECRET, TEST_JWT_EXPIRES_IN } from './test-setup';

export const testJwtConfig: JwtModuleOptions = {
  secret: TEST_JWT_SECRET,
  signOptions: { expiresIn: TEST_JWT_EXPIRES_IN },
};
