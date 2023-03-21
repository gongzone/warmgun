import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import { S3Service } from '../s3/s3.service';
import {
  createPresignedPost,
  type PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post';
import { CreatePresignedUrlDTO } from './lib/dtos';

@Injectable()
export class ImageService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  async createPresignedUrl(username: string, dto: CreatePresignedUrlDTO) {
    const s3Client = this.s3Service.getS3Client();

    const key = `upload/${username}/${uuidv4()}.${mime.extension(
      dto.contentType,
    )}`;

    // Todo: 실패 시 에러 처리
    const presignedData = await createPresignedPost(
      s3Client,
      this.generatePresignedOptions(key, dto.contentType),
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
