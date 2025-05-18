export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T | null;
}

export const successResponse = <T>(message: string, result: T): ApiResponse<T> => ({
  success: true,
  message,
  result,
});

export const errorResponse = (message: string): ApiResponse<null> => ({
  success: false,
  message,
  result: null,
});