import { Module } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [],
  controllers: [ImageController],
  providers: [S3Service, ImageService],
})
export class ImageModule {}
