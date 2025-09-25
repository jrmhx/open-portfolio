import type { ApiResponse, PaginatedResponse } from '@/lib/types'

// base repository class with common API simulation functionality
export abstract class BaseRepository {
  // simulate network delay
  protected async simulateDelay(ms: number = 500): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms))
  }

  // API success response
  protected createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
    return {
      data,
      success: true,
      message,
      timestamp: new Date().toISOString()
    }
  }

  // API error response
  protected createErrorResponse<T>(message: string): ApiResponse<T> {
    return {
      data: null as T,
      success: false,
      message,
      timestamp: new Date().toISOString()
    }
  }

  // paginated response
  protected createPaginatedResponse<T>(
    items: T[],
    page: number = 1,
    limit: number = 10
  ): PaginatedResponse<T> {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = items.slice(startIndex, endIndex)

    return {
      data: paginatedItems,
      success: true,
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        limit,
        total: items.length,
        totalPages: Math.ceil(items.length / limit)
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldSimulateError(errorRate: number = 0): boolean {
    //return Math.random() < errorRate
    return false;
  }
}