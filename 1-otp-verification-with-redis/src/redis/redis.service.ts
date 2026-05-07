/**
 * Service xu ly logic nghiep vu cua Redis.
 * (EN: Business logic service for Redis.)
 */
import {
    Injectable, OnModuleDestroy, OnModuleInit 
} from "@nestjs/common"
import {
    ConfigService 
} from "@nestjs/config"
import {
    Redis 
} from "ioredis"

/**
 * Service quản lý kết nối và thao tác với Redis
 * (EN: Service for managing Redis connections and operations)
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis

    constructor(private configService: ConfigService) {}

    /**
   * Khởi tạo kết nối Redis khi module bắt đầu
   * (EN: Initialize Redis connection when module starts)
   */
    onModuleInit() {
    // Khởi tạo client Redis từ cấu hình (EN: Initialize Redis client from config)
        this.client = new Redis({
            host: this.configService.get<string>("REDIS_HOST",
                "localhost"),
            port: this.configService.get<number>("REDIS_PORT",
                6379),
        })
    }

    /**
   * Đóng kết nối Redis khi module bị hủy
   * (EN: Close Redis connection when module is destroyed)
   */
    async onModuleDestroy() {
    // Ngắt kết nối an toÃ n (EN: Safely disconnect)
        await this.client.quit()
    }

    /**
   * Lưu giá trị vào Redis với thời gian hết hạn (TTL)
   * (EN: Set value in Redis with expiration time - TTL)
   *
   * @param key - Khóa lưu trữ (EN: Storage key)
   * @param value - Giá trị (EN: Value)
   * @param ttlSeconds - Thời gian sống tính bằng giây (EN: Time-to-live in seconds)
   */
    async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    // Lưu key-value với tham số EX để set TTL (EN: Set key-value with EX param for TTL)
        await this.client.set(key,
            value,
            "EX",
            ttlSeconds)
    }

    /**
   * Lấy giá trị từ Redis
   * (EN: Get value from Redis)
   *
   * @param key - Khóa cần lấy (EN: Key to fetch)
   * @returns Promise<string | null> - Giá trị hoặc null nếu không tồn tại
   */
    async get(key: string): Promise<string | null> {
    // Truy xuất giá trị theo key (EN: Retrieve value by key)
        return await this.client.get(key)
    }

    /**
   * Xóa một khóa khá»i Redis
   * (EN: Delete a key from Redis)
   *
   * @param key - Khóa cần xóa (EN: Key to delete)
   */
    async del(key: string): Promise<void> {
    // Xóa key (EN: Delete key)
        await this.client.del(key)
    }

    /**
   * Tăng giá trị của một khóa (nguyên tử)
   * (EN: Increment the value of a key - atomic)
   *
   * @param key - Khóa cần tăng (EN: Key to increment)
   * @returns Promise<number> - Giá trị sau khi tăng
   */
    async incr(key: string): Promise<number> {
    // Tăng biến đếm (EN: Increment counter)
        return await this.client.incr(key)
    }

    /**
   * Thiết lập thời gian hết hạn cho một khóa
   * (EN: Set expiration time for a key)
   *
   * @param key - Khóa cần set (EN: Key to set)
   * @param seconds - Thời gian sống (EN: Time-to-live)
   */
    async expire(key: string, seconds: number): Promise<void> {
    // Set thời gian hết hạn (EN: Set expiration)
        await this.client.expire(key,
            seconds)
    }
}
