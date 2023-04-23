import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service extends S3Client {
  constructor(protected readonly configService: ConfigService) {
    super({
      region: configService.get('S3_BUCKET_REGION'),
      credentials: {
        accessKeyId: configService.get('S3_ACCESS_KEY'),
        secretAccessKey: configService.get('S3_SECRET_KEY'),
      },
    });
  }
}
