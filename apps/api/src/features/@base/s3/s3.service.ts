import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/configs/env.config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(protected configService: ConfigService<EnvConfig, true>) {
    this.s3Client = new S3Client({
      region: this.configService.get('s3.region', { infer: true }),
      credentials: {
        accessKeyId: this.configService.get('s3.accessKey', { infer: true }),
        secretAccessKey: this.configService.get('s3.secretKey', {
          infer: true,
        }),
      },
    });
  }

  getS3Client() {
    return this.s3Client;
  }
}
