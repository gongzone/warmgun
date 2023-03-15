import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from 'src/entities/User.entity';
import { AuthModule } from '../auth/auth.module';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({
  imports: [MikroOrmModule.forFeature([User]), AuthModule],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}
