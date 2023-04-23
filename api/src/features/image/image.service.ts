import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createPresignedPost,
  type PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

import { S3Service } from '../@base/s3/s3.service';
import { CreatePresignedUrlDto } from './dtos';

@Injectable()
export class ImageService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async createPresignedUrl(
    username: string,
    createPresignedUrldto: CreatePresignedUrlDto,
  ) {
    const { contentType } = createPresignedUrldto;

    const key = `upload/${username}/${uuidv4()}.${mime.extension(contentType)}`;

    const presignedData = await createPresignedPost(
      this.s3Service,
      this.generatePresignedOptions(key, contentType),
    );

    return presignedData;
  }

  private generatePresignedOptions(key: string, contentType: string) {
    return {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: key,
      Conditions: [
        ['starts-with', '$Content-Type', 'image/'], // only image
        ['content-length-range', 0, 10000000], // 0 - 10MB
      ],
      Fields: {
        'Content-Type': contentType,
      },
    } satisfies PresignedPostOptions;
  }
}
