import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Draft from 'src/entities/Draft.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Draft])],
  providers: [DraftService],
  controllers: [DraftController],
})
export class DraftModule {}
