import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/config/env.config';

export type ConfigServiceWithEnv = ConfigService<EnvConfig, true>;
