import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Draft from 'src/entities/Draft.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MikroOrmModule.forFeature([Draft]), AuthModule],
  controllers: [DraftController],
  providers: [DraftService],
})
export class DraftModule {}
