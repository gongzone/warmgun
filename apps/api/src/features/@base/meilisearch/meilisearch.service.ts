import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class MeilisearchService extends MeiliSearch {
  constructor(protected readonly configService: ConfigService) {
    super({
      host: `http://${configService.get('MEILISEARCH_HOST')}`,
      apiKey: configService.get('MEILISEARCH_MASTER_KEY'),
    });
  }
}
