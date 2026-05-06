/**
 * Service xu ly logic nghiep vu cua Redis.
 * (EN: Business logic service for Redis.)
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

/**
 * Service quáº£n lÃ½ káº¿t ná»‘i vÃ  thao tÃ¡c vá»›i Redis
 * (EN: Service for managing Redis connections and operations)
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private configService: ConfigService) {}

  /**
   * Khá»Ÿi táº¡o káº¿t ná»‘i Redis khi module báº¯t Ä‘áº§u
   * (EN: Initialize Redis connection when module starts)
   */
  onModuleInit() {
    // Khá»Ÿi táº¡o client Redis tá»« cáº¥u hÃ¬nh (EN: Initialize Redis client from config)
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST', 'localhost'),
      port: this.configService.get<number>('REDIS_PORT', 6379),
    });
  }

  /**
   * ÄÃ³ng káº¿t ná»‘i Redis khi module bá»‹ há»§y
   * (EN: Close Redis connection when module is destroyed)
   */
  async onModuleDestroy() {
    // Ngáº¯t káº¿t ná»‘i an toÃ n (EN: Safely disconnect)
    await this.client.quit();
  }

  /**
   * LÆ°u giÃ¡ trá»‹ vÃ o Redis vá»›i thá»i gian háº¿t háº¡n (TTL)
   * (EN: Set value in Redis with expiration time - TTL)
   *
   * @param key - KhÃ³a lÆ°u trá»¯ (EN: Storage key)
   * @param value - GiÃ¡ trá»‹ (EN: Value)
   * @param ttlSeconds - Thá»i gian sá»‘ng tÃ­nh báº±ng giÃ¢y (EN: Time-to-live in seconds)
   */
  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    // LÆ°u key-value vá»›i tham sá»‘ EX Ä‘á»ƒ set TTL (EN: Set key-value with EX param for TTL)
    await this.client.set(key, value, 'EX', ttlSeconds);
  }

  /**
   * Láº¥y giÃ¡ trá»‹ tá»« Redis
   * (EN: Get value from Redis)
   *
   * @param key - KhÃ³a cáº§n láº¥y (EN: Key to fetch)
   * @returns Promise<string | null> - GiÃ¡ trá»‹ hoáº·c null náº¿u khÃ´ng tá»“n táº¡i
   */
  async get(key: string): Promise<string | null> {
    // Truy xuáº¥t giÃ¡ trá»‹ theo key (EN: Retrieve value by key)
    return await this.client.get(key);
  }

  /**
   * XÃ³a má»™t khÃ³a khá»i Redis
   * (EN: Delete a key from Redis)
   *
   * @param key - KhÃ³a cáº§n xÃ³a (EN: Key to delete)
   */
  async del(key: string): Promise<void> {
    // XÃ³a key (EN: Delete key)
    await this.client.del(key);
  }

  /**
   * TÄƒng giÃ¡ trá»‹ cá»§a má»™t khÃ³a (nguyÃªn tá»­)
   * (EN: Increment the value of a key - atomic)
   *
   * @param key - KhÃ³a cáº§n tÄƒng (EN: Key to increment)
   * @returns Promise<number> - GiÃ¡ trá»‹ sau khi tÄƒng
   */
  async incr(key: string): Promise<number> {
    // TÄƒng biáº¿n Ä‘áº¿m (EN: Increment counter)
    return await this.client.incr(key);
  }

  /**
   * Thiáº¿t láº­p thá»i gian háº¿t háº¡n cho má»™t khÃ³a
   * (EN: Set expiration time for a key)
   *
   * @param key - KhÃ³a cáº§n set (EN: Key to set)
   * @param seconds - Thá»i gian sá»‘ng (EN: Time-to-live)
   */
  async expire(key: string, seconds: number): Promise<void> {
    // Set thá»i gian háº¿t háº¡n (EN: Set expiration)
    await this.client.expire(key, seconds);
  }
}
